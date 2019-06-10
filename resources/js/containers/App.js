import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { NotificationContainer } from "../Components/ReactNotifications";
import { defaultStartPath } from '../Constants/defaultValues'


import AppLocale from '../lang';
import MainRoute from '../Routes';
import login from '../Routes/login'
import register from '../Routes/register'
import error from '../Routes/error'
import forgotPassword from '../Routes/forgot-password'

import '../Assets/css/vendor/bootstrap.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../Assets/css/sass/themes/gogo.light.purple.scss';
/*
color options :
	 'light.purple'		'dark.purple'
	 'light.blue'		'dark.blue'
	 'light.green'		'dark.green'
	 'light.orange'		'dark.orange'
	 'light.red'		'dark.red'
*/

const InitialPath = ({ component: Component,  authUser,...rest }) =>{
	return (<Route
		{...rest}
		render={props =>
			authUser
				? <Component {...props} />
				: <Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
				/>}
	/>);}

const UnAuthRoute = ({ component: Component,  authUser,...rest }) =>{
	return (<Route
		{...rest}
		render={props =>
			authUser
				? <Component {...props} />
				: <Redirect
					to={{
						pathname: '/',
						state: { from: props.location }
					}}
				/>}
	/>);}

class App extends Component {
	render() {
		const { location, match, authenticated, locale } = this.props;
		const currentAppLocale = AppLocale[locale];
		if (location.pathname === '/' && authenticated) {
			return (<Redirect to={defaultStartPath} />);
		}
		if ((location.pathname === '/login' || location.pathname === '/register'
		|| location.pathname === '/forgot-password') && authenticated) {
			return (<Redirect to='/' />);
		}

		return (
				<Fragment>
					<NotificationContainer />
					<IntlProvider
						locale={currentAppLocale.locale}
						messages={currentAppLocale.messages}
					>
					<Fragment>
						<Switch>
							<Route exact path={`/login`} component={login} />
							<Route exact path={`/register`} component={register} />
							<Route exact path={`/forgot-password`} component={forgotPassword} />
							<Route exact path={`/error`} component={error} />
							<InitialPath
								path={`${match.url}`}
								authUser={authenticated}
								component={MainRoute}
							/>
							<Redirect to="/error" />
						</Switch>
					</Fragment>
				</IntlProvider>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ authUser, settings }) => {
	const { authenticated } = authUser;
	const { locale } = settings;
	return { authenticated, locale };
};

export default connect(mapStateToProps,{  })(App);
// || location.pathname === '/app' || location.pathname === '/app/'
