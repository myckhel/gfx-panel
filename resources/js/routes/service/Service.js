import React, { Component, Fragment } from 'react';
import { Input, Label } from "reactstrap";

export default class Service extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <Fragment>
        <Label>
          Service Name
        </Label>
        <Input
          type="text" required name="name"
          id="name" placeholder="Service Name"
        />
      </Fragment>
		);
	}
}
