import React, { Component } from 'react';
// import Auth0Lock from 'auth0-lock'
import { Auth0Lock } from 'auth0-lock'
import { Grid, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import DashBoard from './components/DashBoard'

class App extends Component {
  constructor() {
    super()
    this.state = {
      idToken: '',
      profile: {}
    }
  }
  static defaultProps = {
    clientId: 'gfnYbeiX5avemhRNUunyOQb5oEkpFweL',
    domain: 'jia0.auth0.com'
  }

  componentWillMount() {
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain)

    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) {
          console.log(err)
          return
        }
        this.setData(authResult.idToken, profile)
      })
    })
    this.getData()
  }
  // 這些資料
  setData(idToken, profile) {
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('profile', JSON.stringify(profile))
    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    })
  }


  getData() {
    if (localStorage.getItem('idToken')) {
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {
        console.log(this.state)
      })
    }
  }
  // 登入元素
  showLock() {
    this.lock.show()
  }
  // 登出
  logout() {
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
    if (this.state.idToken) {
      page = <DashBoard
        lock={this.lock}
        idToken={this.state.idToken}
        profile={this.state.profile}
      />
    }
    // 登入失敗
    else {
      page = <Home />
    }


    return (
      <div className="App">
        <Header
          lock={this.lock}
          idToken={this.state.idToken}
          profile={this.state.profile}
          onLoginClick={this.showLock.bind(this)}
          onLogoutClick={this.logout.bind(this)}

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

export default App