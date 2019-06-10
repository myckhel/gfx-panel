import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Email from './email';
// import View from './view';
import SMS from './sms';

export default ({ match }) => {
  return (
    <Switch>
        <Route exact path={`${match.url}/sms`} component={SMS} />
        <Route exact path={`${match.url}/email`} component={Email} />
        // <Route exact path={`${match.url}/:id`} render={props => <View {...props} id={props.id} />} />
        <Redirect to="/error" />
    </Switch>
)};
// <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
