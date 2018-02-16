# Notes
```bash
$ yarn add -S bootstrap@3.3.7 react-bootstrap
$ yarn add auth0-lock
```
## Auth0

到Auth0照著旁邊的tutorial使用
把Google, Facebook(failed), Twitter(被鎖)加進登入方式

載入
```js
import { Auth0Lock } from 'auth0-lock'

class App extends Component {
  static get defaultProps() {
    return {
      clientId: 'LpkqXzjJywLvTRJY1F6gygND1KgkmJ4c',
      domain: 'jia0.auth0.com'
    }
  }

  componentWillMount() {
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain)
  }
```

Chrome是Application/Local Storage，FireFox是Storage/Local Storage，會有(key, value)資訊