import React, { PureComponent, Fragment } from "react";
import { Col, Media } from "reactstrap";
import { customerProfile } from '../../helpers/ajax/customer'
import ViewAble from '../../components/app/ViewAble'
import { View, Button, Text, IText } from '../../components/app/Page'

export default class extends ViewAble {
  constructor(props){
    super(props)
    this.state = {
      params: props.params,
      isLoading: true,
      profile: {},
      status: null,
    }
  }

  componentDidMount = () => {
    this.initAsync()
  }

  // componentDidMount = async () => {
  //   try {
  //     const data = await customerProfile(this.state.params.id)
  //     this.setState({profile: data.profile})
  //   } catch (e) {
  //     if (e.response) {
  //       if (e.response.status === 404) {
  //         this.setState({status: 404})
  //       }
  //     }
  //   } finally {
  //     if (this.state.status !== 404) {
  //       this.setState({isLoading: false})
  //     }
  //   }
  // }

  name="profile"
	viewAsync = (id) => customerProfile(id)

  render = () => {
    const { profile } = this.state.profile
    const { firstname, lastname, jobs_failed, jobs_pending, jobs_completed, jobs_on_hold, credentialServices } = profile || {}

    return (
      <this.Template pageName={firstname && firstname+' '+lastname || 'Customer'}>
        <Col className="col-md-2">
          <View className="center">
            <Media style={styles.img} object src="/assets/img/default-service.png" />
          </View>
          <h1 style={styles.head}>{`${firstname} ${lastname}`}</h1>
        </Col>
        <Col className="col-md-8">
          <View className="col-sm-12">
            <this.Status bg="danger" hd head="Jobs Failed" />
            <this.Status bg="warning" hd head="Jobs On Hold" />
            <this.Status bg="info" hd head="Jobs Pending" />
            <this.Status bg="success" hd head="Jobs Completed" />
          </View>
          <View className="col-sm-12">
            <this.Status bg="danger" status={jobs_failed} />
            <this.Status bg="warning" status={jobs_on_hold} />
            <this.Status bg="info" status={jobs_pending} />
            <this.Status bg="success" status={jobs_completed} />
          </View>
        </Col>

        <View style={styles.body}>
          <Col xxs="12">
            <View>
              <Text size={2}>Credential Services</Text>
              {credentialServices && credentialServices.map((cred, i) => (
              <View key={i}>
                <Text>Airtime: </Text>
                {cred.Airtime.map((serv, name) => (
                  <View key={name}>
                    <Text>{name}</Text>
                    <Text>{serv.Phone}</Text>
                  </View>
                ))}
              </View>
              ))}
            </View>
          </Col>
        </View>
      </this.Template>
    );
  }
}

const styles = {
  img: {
    width: '200px',
    height: '200px',
    backgroundColor: 'grey',
    backgroundSize: 'contain',
    borderRadius: '5px',
    border: '5px gold',
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
    backgroundColor: 'rgba(251,65,02,0.5)'
  }
}
