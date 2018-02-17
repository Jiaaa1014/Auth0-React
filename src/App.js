import React, { Component } from 'react';
import { Auth0Lock } from 'auth0-lock'
import { Grid, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import DashBoard from './components/DashBoard'

export default class App extends Component {
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

  setData = (idToken, profile) => {
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('profile', JSON.stringify(profile))
    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    })
  }

  getData = () => {
    if (localStorage.getItem('idToken')) this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    })
  }

  showLock = () => this.lock.show()

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
    if (this.state.idToken) {
      page = <DashBoard
        lock={this.lock}
        idToken={this.state.idToken}
        profile={this.state.profile}
      />
    }

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