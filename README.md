# Notes
```bash
$ yarn add -S bootstrap@3.3.7 react-bootstrap
$ yarn add auth0-lock
```
## Auth0

到Auth0照著旁邊的tutorial使用
把Google, Facebook(failed), Twitter(被鎖)加進登入方式



```js
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      idToken: '',
      profile: {}
    }
  }
  // 必要的東西
  static defaultProps = {
    clientId: 'gfnYbeiX5avemhRNUunyOQb5oEkpFweL',
    domain: 'jia0.auth0.com'
  }

  // 在mount之前
  componentWillMount() {
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain)

    // 監聽
    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) {
          console.log(err)
          return
        }
        // 設置
        this.setData(authResult.idToken, profile)
      })
    })
    // 取得
    this.getData()
  }
  setData = (idToken, profile) =>{
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('profile', JSON.stringify(profile))
    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    })
  }
  // Chrome是Application/Local Storage
  // FireFox是Storage/Local Storage，會有(key, value)資訊


  getData = () => {
    if (localStorage.getItem('idToken')) {
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      })
    }
  }

  // 登入元素
  showLock = () => this.lock.show()

  // 登出
  logout = () => {
    this.setState({
      idToken: '',
      profile: ''
    }, () => {
      localStorage.removeItem('idToken')
      localStorage.removeItem('profile')
    })
  }

  render() {
    let page
    // 若登入成功
    if (this.state.idToken) page = <DashBoard
                                      lock={this.lock}
                                      idToken={this.state.idToken}
                                      profile={this.state.profile}
                                    />
    // 登入失敗
    else page = <Home />


    return (
      <div className="App">
        <Header
          lock={this.lock}
          idToken={this.state.idToken}
          profile={this.state.profile}
          onLoginClick={this.showLock}
          onLogoutClick={this.logout}

        />
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              {page}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
```
