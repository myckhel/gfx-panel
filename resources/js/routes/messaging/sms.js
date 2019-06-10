import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";
import { Colxx, Separator } from "../../Components/CustomBootstrap";
import BreadcrumbContainer from "../../Components/BreadcrumbContainer";

export default class extends Component {
  constructor(props){
    super(props)
    this.state = {
      // id: props.id
    }
  }

  render = () => {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={'SMS'}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <div className="container bg-dark">
            <h1>Waiting...</h1>
          </div>
        </Row>
      </Fragment>
    );
  }
}
