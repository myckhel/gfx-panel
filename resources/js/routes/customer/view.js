import React, { Component, Fragment } from "react";
import { Col, Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";
import { Colxx, Separator } from "../../Components/CustomBootstrap";
import BreadcrumbContainer from "../../Components/BreadcrumbContainer";
import Http from '../../util/Http'

export default class extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.id
    }
  }

  componentWillMount = () => {
    Http.get('/api/customers/501')
    .then((res) => res.data)
    .then((data) => console.log(data))
  }

  render = () => {
    return (
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
        </Col>

        </Row>
      </Fragment>
    );
  }
}
