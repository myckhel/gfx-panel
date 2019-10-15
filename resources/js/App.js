require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './containers/App';

import { store } from './Redux/store';
import { checkAuth } from './Redux/actions';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
	autoClose: 8000,
	draggable: false,
})

store.dispatch(checkAuth())

const MainApp = () => (
	<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</Router>
	</Provider>
);

export default  ReactDOM.render(
	<MainApp />,
	document.getElementById("root")
);
