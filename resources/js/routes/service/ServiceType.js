import React, { Component, Fragment } from 'react';
import { Input, Label, Col, Row, Button } from "reactstrap";

export default class ServiceType extends Component {
	constructor(props) {
		super(props);
    this.state = {
      // key: props.index
    }
	}

	render() {
		return (
      <Fragment>
        <Row id="service-type-inputs">
          <Col xs="5">
            <Input
              type="text" required name="name[]"
              id="name" placeholder="Type Name"
            />
          </Col>
          <Col xs="5">
            <Input
              type="number" required name="price[]"
              id="price" placeholder="Type Price"
            />
          </Col>
          <Col xs="2">
            <Button color="warning" onClick={() => this.props.remove(this.props.index)}> <span aria-hidden > &ndash;</span> </Button>
          </Col>
        </Row>
      </Fragment>
		);
	}
}
