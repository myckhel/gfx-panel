import React, { PureComponent, Fragment } from "react";
import { Col, Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";
import { Colxx, Separator } from "../../Components/CustomBootstrap";
import BreadcrumbContainer from "../../Components/BreadcrumbContainer";
import { Media } from 'reactstrap'
import { Redirect } from 'react-router-dom';
import { customerProfile } from '../../helpers/ajax/customer'
import { Text } from "../../components/common/UI"

export default class extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      params: props.params,
      isLoading: true,
      profile: {},
      status: null,
    }
  }

  componentDidMount = async () => {
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
      if (this.state.status !== 404) {
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

    const { firstname, lastname, completed_jobs_count, completed_payments_count, credentialServices } = this.state.profile

    return (
      this.state.isLoading ?
        <div className="loading">Profile</div>
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
            <Row style={styles.head}>
              <h1 style={styles.head}>{`${firstname} ${lastname}`}</h1>
            </Row>
            <Row style={styles.body}>
              <Colxx xxs="12">
                <Row>
                  <Text size={2}>Completed Jobs</Text>
                  <Text>{completed_jobs_count}</Text>
                </Row>
                <Row>
                  <Text size={2}>Completed Payments</Text>
                  <Text>{completed_payments_count}</Text>
                </Row>
                <Row>
                  <Text size={2}>Credential Services</Text>
                  {credentialServices.map((cred, i) => (
                  <Row key={i}>
                    <Text>Airtime: </Text>
                    {cred.Airtime.map((serv, name) => (
                      <Row key={name}>
                        <Text>{name}</Text>
                        <Text>{serv.Phone}</Text>
                      </Row>
                    ))}
                  </Row>
                  ))}
                </Row>
              </Colxx>
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
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
    backgroundColor: 'rgba(251,65,02,0.5)'
  }
}
