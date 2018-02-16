import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'


export default class DashBoard extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={9} md={9}>
              <h1>DashBoard</h1>
              <p>Welcome to the dashboard</p>
            </Col>
            <Col xs={3} md={3}>
              <img src={this.props.profile.picture} role="presentation" />
              <h3>{this.props.profile.nickname}</h3>
              <strong>{this.props.profile.email}</strong>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
