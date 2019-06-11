import React, { Component, Fragment } from 'react';
import { Input, Label } from "reactstrap";

export default class Service extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: props.errors
		}
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps == this.props) {
			this.setState({errors: nextProps.errors})
		}
	}

	render() {
		return (
      <Fragment>
			{this.state.errors.has('name') && <div className="invalid-feedback">{this.state.errors.first('name')}</div>}
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
