import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";
import { Colxx, Separator } from "../../Components/CustomBootstrap";
import BreadcrumbContainer from "../../Components/BreadcrumbContainer";

export default class extends Component {
  constructor(props){
    super(props)
    this.state = {
      customers: []
    }
  }
  componentWillMount = () => axios.get('/api/customer')
    .then((res) => res.data ? this.setState({customers: res.data}) : console.log('no data') )
    .catch((error) => console.log('error fetching', error))

  Customers = props => (
    <Colxx xxs="12">
      <p>{props.customer.firstname}</p>
      <p>{props.customer.lastname}</p>
      <p>{props.customer.email}</p>
      <p>{props.customer.phone}</p>
    </Colxx>
  )

  render() {
    let customers = []
    this.state.customers.map((c, i) => {
      customers.push(<this.Customers key={i} customer={c} />)
    })
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={'customers'}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          {customers}
        </Row>
      </Fragment>
    );
  }
}
