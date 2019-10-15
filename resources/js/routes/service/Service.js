import React, { PureComponent, Fragment } from 'react';
import { Input, Label } from "reactstrap";

export default class Service extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			errors: props.errors,
			credentials: {name: props.name}
		}
	}

	static getDerivedStatesFromProps = (nextProps) => {
		if (nextProps !== this.props) {
			this.setState({
				errors: nextProps.errors,
				credentials: { name: nextProps.name }
			});
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
					value={this.state.credentials.name}
					onChange={(e) => this.props.handleInputChange(e)}
          type="text" required name="name"
          id="name" placeholder="Service Name"
        />
      </Fragment>
		);
	}
}
