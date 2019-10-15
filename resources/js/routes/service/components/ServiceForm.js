import React, {Fragment, Component} from 'react'
import {
  Row, Button, ModalHeader, ModalBody,
  ModalFooter, Input, Label, Form, Col
} from "reactstrap";
import Select from "react-select";

import ReeValidate from 'ree-validate'
import { removeErrors, addErrors } from '../../../helpers/errors'
import formToObj from '../../../helpers/formToObj'
import { getCountriesCode, selectable } from '../../../helpers/data'
import { addCustomers } from '../../../helpers/ajax/customer'
import {toast} from 'react-toastify'
import Http from '../../../util/Http'

import Service from '../Service';
import ServiceType from '../ServiceType';

export default class extends Component {
  constructor(props) {
    super(props)

    this.validator = new ReeValidate({
      name: 'required|min:3|max:45'
    })

    this.state = {
      errors: this.validator.errors,
      credentials: {
        name: ''
      },
      selectedService: {},
      form: {
        name: '',
        submitName: 'Save',
        cancelName: 'Cancel',
        state: 'service'
      },
      serviceTypeRow: [],
    }
    this.state.serviceTypeRow[0] = <ServiceType remove={this.removeServiceTypeRow} key={0} index={0} />;
  }

  // form submit
  submitForm = (event) => {
    const form = $(event.target)
    event.persist()
    event.preventDefault();

    const { errors } = this.validator
    const formData = formToObj($(form).serializeArray());
    const slug = this.state.form.state === 'type' ? '/api/service-metas' : '/api/services';
    const callback = this.state.form.state === 'type' ? false : this.toggleFormState;

    this.setState(prev => ({
      errors: removeErrors(prev.errors)
    }))
    this.validator.validateAll(formData)
    .then((success) => {
      if (success) {
        this.setState({isLoading: false}, () => {
          Http.post(slug, formData)//, { headers: {'content-Type': `multipart/form-data; application/x-www-form-urlencoded; charset=UTF-8` } })//{url: slug, data: formData, config: { headers: {'content-Type': 'multipart/form-data'}}})
          .then((res) => res.data )
          .then((res) => {
            if (res.status) {
              $(form).trigger('reset')

              if (this.state.form.state === 'service') {
                const service = {label: res.service.name, value: res.service.id};
                this.setState( (prev) => {
                  return {services: [ service ] }
                }, () => this.selectService(service) )
              } else {
                this.toggleFormState()
              }

              if (callback) {
                callback()
              }
              swal('Success', res.errors, 'success')
              // createNotification('success', 'True')
            } else {
              // alert warning
              swal('Ooooops!', res.errors || res.text, 'error')
              // alert(res.text)
            }
            this.props.dataListRender()
          })
          .catch((err) => {
            this.props.dataListRender()
            swal('Ooooops!', 'Internal Server Error', 'error')
          })
        })
      } else {
        this.setState({ errors })
      }
    })
  }


  // input change
  handleInputChange = ({ target }) => {
    const name = target.name
    const value = target.value
    const { errors } = this.validator

    this.setState(prev => { return {credentials: {...prev.credentials, [name]: value}} })

    errors.remove(name)
    this.validator.validate(name, value)
      .then(() => {
        this.setState({ errors })
      })
  }


  addServiceTypeRow = () => {
    this.setState((prev) => {
      let last = 0;
      prev.serviceTypeRow.map( (v, key) => {
        last = key
      })
      let row = [...prev.serviceTypeRow];
      row[last+1] = <ServiceType remove={this.removeServiceTypeRow}
        key={last+1} index={last+1} />

      return { serviceTypeRow: row }
    })
  }

  removeServiceTypeRow = (key) => {
    this.setState((prev) => {
      let row = [];
      prev.serviceTypeRow.map((v, i) => {
        if (i !== key) {
          row[i] = v;
        }
      });
      return {serviceTypeRow: row}
    })
  }

  selectService = (service) => {
    this.setState({ selectedService: {label: service, value: service }  })
  }

  toggleFormState = () => {
    const state = this.state.form.state === 'service' ? 'type' : 'service';
    this.setState((prev) => {
      return {form: {...prev.form, state}}
    }, () => {
      // this.selectService(this.state.selectedService);
    })
  }

  render = () => {
    const { toggleModal, services } = this.props
    const { state } = this.state.form
    const { credentials, errors, selectedService } = this.state
    const serviceType = this.state.serviceTypeRow;

    return (
      <Form id={'service-form'} onSubmit={this.submitForm}>
        <ModalHeader toggle={toggleModal}>
          Add New Service +
        </ModalHeader>
        <ModalBody>
          {state === 'service'
          ? <Service
              name={credentials.name}
              handleInputChange={this.handleInputChange} errors={errors}
            />
          : <Fragment>
            <Row id="add-service-type-row">
              <Col sm="8" className="col-sm-offset-2">
                <Select
                  onChange={(e) => this.selectService(e, 'country_code')}
                  value={selectedService.value}
                  name='service_id'
                  options={services}
                  onKeyUp={(e)=>console.log(e)}></Select>
              </Col>
            </Row>
            {serviceType}
            <Row id="add-service-type-row">
              <Col xs="8" className="col-xs-offset-2">
                <Button
                  color="info" onClick={() => {this.addServiceTypeRow}}
                > <span aria-hidden > Add More Service Type</span>
                </Button>
              </Col>
            </Row>
          </Fragment>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            outline
            onClick={toggleModal}
          >
          {this.state.form.cancelName}
          </Button>
          <Button
          disabled={this.state.errors.any() || this.state.loading}
          type="submit" id="btn" color="primary" >
          {this.state.loading?
            <div className="btn-loading"></div>
         : this.state.form.submitName}
          </Button>{" "}
        </ModalFooter>
      </Form>
    )
  }
}
