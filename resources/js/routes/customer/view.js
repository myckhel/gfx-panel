import React, { Component, Fragment } from "react";
import { Col, Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";
import { Colxx, Separator } from "../../Components/CustomBootstrap";
import BreadcrumbContainer from "../../Components/BreadcrumbContainer";
import Http from '../../util/Http'
import { Media } from 'reactstrap'
import { Redirect } from 'react-router-dom';
import { customerProfile } from '../../helpers/ajax/customer'
export default class extends Component {
  constructor(props){
    super(props)
    this.state = {
      params: props.params,
      isLoading: true,
      profile: {},
    }
  }

  componentWillMount = async () => {
    this.setState({isLoading: true})
    try {
      const data = await customerProfile(this.state.params.id)
      this.setState({profile: data.profile})
    } catch (e) {
      if (e.response) {
        if (e.response.status === 404) {
          this.setState({status: 404})
        }
      }
    } finally {
      if (!this.state.status === 404) {
        this.setState({isLoading: false})
      }
    }
  }

  render = () => {
    if (this.state.status === 404) {
      return <Redirect to={{
        pathname: '/error',
        state: { from: this.props.location }
      }} />
    }
    return (
      this.state.isLoading ?
        <div className="loading"></div>
     :
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={'customers'}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Col xs="12">
            <Row className="center">
              <Media style={styles.img} object src="/assets/img/default-service.png" />
            </Row>
            <Row>
              <h1 style={styles.head}>fghkj{this.state.profile.firstname}</h1>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const styles = {
  img: {
    width: '200px',
    height: '200px',
    backgroundColor: 'grey',
    backgroundSize: 'contain',
    borderRadius: '5px',
    border: '5px gold',
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center',

  }
}
