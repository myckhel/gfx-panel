import React, { Component, Fragment } from "react";
import IntlMessages from "../../Util/IntlMessages";
import { Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";

import { Colxx, Separator } from "../../Components/CustomBootstrap";
import BreadcrumbContainer from "../../Components/BreadcrumbContainer";

export default class extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.id,
      customers: []
    }
  }
  componentWillUnmount = () => axios.get('/api/customer')
    .then((data) => data ? this.setState({customers: data}) : console.log('no data') )
    .catch((error) => console.log('error'))

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.all" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {
          /*Enjoy!*/
          state.data ? <div>data</div> : <p>no data</p>
        }
      </Fragment>
    );
  }
}
