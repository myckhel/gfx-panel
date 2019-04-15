import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import all from './all';
import View from './view';

export default ({ match }) => (
    <Switch>
        <Route exact path={`${match.url}/`} component={all} />
        <Route exact path={`${match.url}/:id`} render={props => <View id={props.id} />} />
        <Redirect to="/error" />
    </Switch>
);
// <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
