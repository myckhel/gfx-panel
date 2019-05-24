import React, { Component } from 'react';
import { Route, withRouter, Switch,Redirect } from 'react-router-dom';

import TopNav from '../Containers/TopNav'
import Sidebar from '../Containers/Sidebar';

// import dashboard from './dashboard';
import customer from './customer';
import service from './service';
import { connect } from 'react-redux';


class MainApp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { match, containerClassnames} = this.props;
		return (
			<div id="app-container" className={containerClassnames}>
				<TopNav history={this.props.history} />
				<Sidebar/>
				<main>
					<div className="container-fluid">
						<Switch>
							<Route path={`${match.url}customers`} component={customer} />
							<Route path={`${match.url}services`} component={service} />
							<Route path={`${match.url}messaging`} component={customer} />
							<Route path={`${match.url}settings`} component={customer} />
							<Redirect to="/error" />
						</Switch>
					</div>
				</main>
			</div>
		);
	}
}
const mapStateToProps = ({ menu }) => {
	const { containerClassnames} = menu;
	return { containerClassnames };
  }

  export default withRouter(connect(mapStateToProps, {})(MainApp));
	// <Route exact path={`${match.url}`} component={dashboard} />
