import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import all from './all';
import View from './view';
import dataList from './data-list';

export default ({ match }) => {
  return (
    <Switch>
        <Route exact path={`${match.url}/`} component={dataList} />
        <Route exact path={`${match.url}/data-list`} component={dataList} />
        <Route exact path={`${match.url}/:id`} render={props => <View id={props.id} />} />
        <Redirect to="/error" />
    </Switch>
)};
// <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
