import React, { Component, Fragment } from "react";
import { injectIntl} from 'react-intl';
import { NavLink } from "react-router-dom";
import mouseTrap from "react-mousetrap";
import Select from "react-select-search";
import "react-select-search/style.css";
import classnames from "classnames";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Row, Card, CustomInput, Button, Modal, ModalHeader, ModalBody,
ModalFooter, ButtonDropdown, UncontrolledDropdown, Collapse, DropdownMenu,
DropdownToggle, DropdownItem, Input, CardBody, CardSubtitle, CardImg, Label,
CardText, Badge, Form, FormGroup, FormText, Col } from "reactstrap";

import { Colxx, Separator } from "../../Components/CustomBootstrap";
import BreadcrumbContainer from "../../Components/BreadcrumbContainer";
import { BreadcrumbItems } from "../../Components/BreadcrumbContainer";
import Pagination from "../../Components/List/Pagination";
function collect(props) {
  return { data: props.data };
}
import createNotification from '../../Components/ReactNotifications/alerts';
import {EmptyRow} from '../../Components/empty';
import {_token} from '../../Constants/defaultValues';
import ServiceType from './ServiceType';
import Service from './Service';

class All extends Component {
  constructor(props){
    super(props)

    this.state = {
      items: [],
      visible: true,
      serviceTypeRow: [],
      services: [],//{name: 'James', value: 33},{name: 'Fake', value: 29}
      selectedService: {},
      form: {
        name: '',
        submitName: 'Save',
        cancelName: 'Cancel',
        state: 'service'
      },
      displayMode: "imagelist",
      pageSizes: [10, 20, 30, 50, 100],
      selectedPageSize: 10,
      orderOptions:[
        {column: "name",label: "Name"},
      ],
      selectedOrderOption:  {column: "name",label: "Name"},
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      displayOptionsIsOpen: false,
      isLoading:false
    };
    this.state.serviceTypeRow[0] = <ServiceType remove={this.removeServiceTypeRow} key={0} index={0} />;
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  componentWillMount() {
    this.props.bindShortcut(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.props.bindShortcut(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
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

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  toggleDisplayOptions = () => {
    this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  }

  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  changeOrderBy = (column) => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
  }
  changePageSize(size) {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  }
  changeDisplayMode(mode) {
    this.setState({
      displayMode: mode
    });
    return false;
  }
  onChangePage(page) {
    this.setState({ currentPage: page },
      () => this.dataListRender()
    );
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value.toLowerCase() })
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.dataListRender()
    }
  }

  handleCheckChange(event, id) {
    if (
      event.target.tagName == "A" ||
      (event.target.parentElement &&
        event.target.parentElement.tagName == "A")
    ) {
      return true;
    }
    if (this.state.lastChecked == null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
      });
    }
    document.activeElement.blur();
  }

  getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  handleChangeSelectAll(isToggle) {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x.id)
      });
    }
    document.activeElement.blur();
    return false;
  }
  componentDidMount() {
    this.dataListRender();
  }

  dataListRender = () => {
    const {selectedPageSize,currentPage,selectedOrderOption,search} = this.state;
    this.setState({
      isLoading:false
    }, () => {
      axios.get(`/api/services?pageSize=${selectedPageSize}&page=${currentPage}
        &orderBy=${selectedOrderOption.column}&search=${search}`)
      .then(res => {
        return res.data
      }).then(data=>{
        this.setState({
          totalPage: data.last_page,
          items: data.data,
          selectedItems:[],
          totalItemCount : data.total,
          isLoading:true
        });
      // axios.get(`${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}
      // &orderBy=${selectedOrderOption.column}&search=${search}`)
      })
    });
  }

  // delete
  delete = async () => {
    const items = this.state.selectedItems
    if (!items.length > 0) {
      return;
    }
    // delete items
    if (confirm('Are you sure you wish to delete selected services?')) {
      this.setState({isLoading: false}, () => {
        $.ajax({url: `/api/services/delete/multiple`, data: {_token, ids: items}, type: 'DELETE'})
        .done((res) => {
          console.log(res.text);
          this.dataListRender()
        })
        .fail((err) => {
          this.dataListRender()
          console.log(err)
        })
      })
    }
  }

  selectService = (service) => {
    this.setState({ selectedService: service  })
  }

  toggleFormState = () => {
    const state = this.state.form.state === 'service' ? 'type' : 'service';
    this.setState((prev) => {
      return {form: {...prev.form, state}}
    }, () => {
      // this.selectService(this.state.selectedService);
    })
  }

  handleKeyUp = (keys) => {
    console.log(keys);
    if (keys.length >! 2) {
      return;
    }

    this.setState({
      isLoading:false
    }, () => {
      $.get(`/api/services?pagenate=${false}&search=${keys}`)
      .done((res) => {      })
      .fail((err) => console.log(err))
    }
    )
  }

  // form submit
  submitForm = (event) => {
    const form = $(event.target)
    event.persist()
    event.preventDefault();
    const slug = this.state.form.state === 'type' ? '/api/service-metas' : '/api/services';
    const callback = this.state.form.state === 'type' ? false : this.toggleFormState;
    this.setState({isLoading: false}, () => {
      $.post(slug, $(form).serializeArray())
      .done((res) => {
        if (res.status) {
          $(form).trigger('reset')

          if (this.state.form.state === 'service') {
            const service = {name: res.service.name, value: res.service.id};
            this.setState( (prev) => {
              return {services: [ service ] }
            }, () => this.selectService(service))
          }

          this.dataListRender()
          if (callback) {
            callback()
          }
          alert(res.status)
          createNotification('success', 'True')
        } else {
          // alert warning
          alert(res.text)
        }
      })
      .fail((err) => {
        alert(err)
        console.log(err);
      })
    })
  }

  onContextMenuClick = (e, data, target) => {
    console.log("onContextMenuClick - selected items",this.state.selectedItems)
    console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems :[clickedProductId]
      });
    }
    return true;
  };

  render() {
    const startIndex= (this.state.currentPage-1)*this.state.selectedPageSize
    const endIndex= (this.state.currentPage)*this.state.selectedPageSize
    const {messages} = this.props.intl;
    const serviceType = this.state.serviceTypeRow;
    return (
      !this.state.isLoading?
        <div className="loading"></div>
     :
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>
                Services
              </h1>

              <div className="float-sm-right">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={this.toggleModal}
                >
                  Add New Service
                </Button>
                {"  "}

                <Modal
                  isOpen={this.state.modalOpen}
                  toggle={this.toggleModal}
                  wrapClassName="modal-right"
                  backdrop="static"
                >
                  <Form id={'service-form'} onSubmit={(e) => {this.submitForm(e)}}>
                    <ModalHeader toggle={this.toggleModal}>
                      Add New Service +
                    </ModalHeader>
                    <ModalBody>
                      {this.state.form.state === 'service' ? <Service />
                      : <Fragment>
                        <Row id="add-service-type-row">
                          <Col sm="8" className="col-sm-offset-2">
                            <Select value={this.state.selectedService.value} name='service_id' onChange={this.selectService}
                              options={this.state.services} onKeyUp={console.log}></Select>
                          </Col>
                        </Row>
                        {serviceType}
                        <Row id="add-service-type-row">
                          <Col xs="8" className="col-xs-offset-2">
                            <Button color="info" onClick={() => {this.addServiceTypeRow()}}> <span aria-hidden > Add More Service Type</span> </Button>
                          </Col>
                        </Row>
                      </Fragment>}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary"
                        outline
                        onClick={this.toggleModal}
                      >
                      {this.state.form.cancelName}
                      </Button>
                      <Button type="submit" id="btn" color="primary" >
                        {this.state.form.submitName}
                      </Button>{" "}
                    </ModalFooter>
                  </Form>
                </Modal>
                <ButtonDropdown
                  isOpen={this.state.dropdownSplitOpen}
                  toggle={this.toggleSplit}
                >
                  <div className="btn btn-primary pl-4 pr-0 check-button">
                    <Label
                      for="checkAll"
                      className="custom-control custom-checkbox mb-0 d-inline-block"
                    >
                      <Input
                        className="custom-control-input"
                        type="checkbox"
                        id="checkAll"
                        onChange = {() => {}}
                        checked={
                          this.state.selectedItems.length >=
                          this.state.items.length
                        }
                        onClick={() => this.handleChangeSelectAll(true)}
                      />
                      <span
                        className={`custom-control-label ${
                          this.state.selectedItems.length > 0 &&
                          this.state.selectedItems.length <
                            this.state.items.length
                            ? "indeterminate"
                            : ""
                        }`}
                      />
                    </Label>
                  </div>
                  <DropdownToggle
                    caret
                    color="primary"
                    className="dropdown-toggle-split pl-2 pr-2"
                  />
                  <DropdownMenu right>
                    <DropdownItem onClick={() => this.delete()} >
                      <i className="simple-icon-trash" /> <span>Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>

              <BreadcrumbItems match={this.props.match} />
            </div>

            <div className="mb-2">
              <Button
                color="empty"
                className="pt-0 pl-0 d-inline-block d-md-none"
                onClick={this.toggleDisplayOptions}
              >
                Display Options{" "}
                <i className="simple-icon-arrow-down align-middle" />
              </Button>
              <Collapse
                isOpen={this.state.displayOptionsIsOpen}
                className="d-md-block"
                id="displayOptions"
              >
               <span className="mr-3 mb-2 d-inline-block float-md-left">
                <a
                  className={`mr-2 view-icon ${
                    this.state.displayMode === "list" ? "active" : ""
                    }`}
                  onClick={() => this.changeDisplayMode("list")}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                <path className="view-icon-svg" d="M17.5,3H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z" />
                <path className="view-icon-svg" d="M17.5,10H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z" />
                <path className="view-icon-svg" d="M17.5,17H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z" /></svg>
                </a>
                <a
                  className={`mr-2 view-icon ${
                    this.state.displayMode === "thumblist" ? "active" : ""
                    }`}
                  onClick={() => this.changeDisplayMode("thumblist")}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                <path className="view-icon-svg" d="M17.5,3H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" />
                <path className="view-icon-svg" d="M3,2V3H1V2H3m.12-1H.88A.87.87,0,0,0,0,1.88V3.12A.87.87,0,0,0,.88,4H3.12A.87.87,0,0,0,4,3.12V1.88A.87.87,0,0,0,3.12,1Z" />
                <path className="view-icon-svg" d="M3,9v1H1V9H3m.12-1H.88A.87.87,0,0,0,0,8.88v1.24A.87.87,0,0,0,.88,11H3.12A.87.87,0,0,0,4,10.12V8.88A.87.87,0,0,0,3.12,8Z" />
                <path className="view-icon-svg" d="M3,16v1H1V16H3m.12-1H.88a.87.87,0,0,0-.88.88v1.24A.87.87,0,0,0,.88,18H3.12A.87.87,0,0,0,4,17.12V15.88A.87.87,0,0,0,3.12,15Z" />
                <path className="view-icon-svg" d="M17.5,10H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" />
                <path className="view-icon-svg" d="M17.5,17H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z" /></svg>
                </a>
                <a
                  className={`mr-2 view-icon ${
                    this.state.displayMode === "imagelist" ? "active" : ""
                    }`}
                  onClick={() => this.changeDisplayMode("imagelist")}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
                <path className="view-icon-svg" d="M7,2V8H1V2H7m.12-1H.88A.87.87,0,0,0,0,1.88V8.12A.87.87,0,0,0,.88,9H7.12A.87.87,0,0,0,8,8.12V1.88A.87.87,0,0,0,7.12,1Z" />
                <path className="view-icon-svg" d="M17,2V8H11V2h6m.12-1H10.88a.87.87,0,0,0-.88.88V8.12a.87.87,0,0,0,.88.88h6.24A.87.87,0,0,0,18,8.12V1.88A.87.87,0,0,0,17.12,1Z" />
                <path className="view-icon-svg" d="M7,12v6H1V12H7m.12-1H.88a.87.87,0,0,0-.88.88v6.24A.87.87,0,0,0,.88,19H7.12A.87.87,0,0,0,8,18.12V11.88A.87.87,0,0,0,7.12,11Z" />
                <path className="view-icon-svg" d="M17,12v6H11V12h6m.12-1H10.88a.87.87,0,0,0-.88.88v6.24a.87.87,0,0,0,.88.88h6.24a.87.87,0,0,0,.88-.88V11.88a.87.87,0,0,0-.88-.88Z" /></svg>
                </a>
              </span>

                <div className="d-block d-md-inline-block">
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      Order By
                      {this.state.selectedOrderOption.label}
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.state.orderOptions.map((order, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => this.changeOrderBy(order.column)}
                          >
                            {order.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      value={this.state.search}
                      id="search"
                      onChange={(e) => this.handleSearchChange(e)}
                      placeholder={messages["menu.search"]}
                      onKeyPress={e => this.handleKeyPress(e)}
                    />
                  </div>
                </div>
                <div className="float-md-right">
                  <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${
                    this.state.totalItemCount
                  } `}</span>
                  <UncontrolledDropdown className="d-inline-block">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      {this.state.selectedPageSize}
                    </DropdownToggle>
                    <DropdownMenu right>
                      {this.state.pageSizes.map((size, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => this.changePageSize(size)}
                          >
                            {size}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </Collapse>
            </div>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
        {!this.state.items.length > 0 ? <EmptyRow /> : this.state.items.map(product => {
          if (this.state.displayMode === "imagelist") {
            return (
              <Colxx
                sm="6"
                lg="4"
                xl="3"
                className="mb-3"
                key={product.id}
              >
                <ContextMenuTrigger
                  id="menu_id"
                  data={product.id}
                  collect={collect}
                >
                  <Card
                    onClick={event =>
                      this.handleCheckChange(event, product.id)
                    }
                    className={classnames({
                      active: this.state.selectedItems.includes(
                        product.id
                      )
                    })}
                  >
                    <div className="position-relative">
                      <NavLink
                        to={`/services/${product.id}`}
                        className="w-40 w-sm-100"
                      >
                        <CardImg
                          top
                          alt={product.firstname}
                          src={'/assets/img/gfx-logo.jpg'}
                        />
                      </NavLink>
                      <Badge
                        color={'red'}
                        pill
                        className="position-absolute badge-top-left"
                      >
                        {'red'}
                      </Badge>
                    </div>
                    <CardBody>
                      <Row>
                        <Colxx xxs="2">
                          <CustomInput
                            className="itemCheck mb-0"
                            type="checkbox"
                            id={`check_${product.id}`}
                            checked={this.state.selectedItems.includes(
                              product.id
                            )}
                            onChange={() => {}}
                            label=""
                          />
                        </Colxx>
                        <Colxx xxs="10" className="mb-3">
                          <CardSubtitle>{product.name}</CardSubtitle>
                          <CardText className="text-muted text-small mb-0 font-weight-light">
                            {product.created_at}
                          </CardText>
                        </Colxx>
                      </Row>
                    </CardBody>
                  </Card>
                </ContextMenuTrigger>
              </Colxx>
            );
          } else if (this.state.displayMode === "thumblist") {
            return (
              <Colxx xxs="12" key={product.id} className="mb-3">
                <ContextMenuTrigger
                  id="menu_id"
                  data={product.id}
                  collect={collect}
                >
                  <Card
                    onClick={event =>
                      this.handleCheckChange(event, product.id)
                    }
                    className={classnames("d-flex flex-row", {
                      active: this.state.selectedItems.includes(
                        product.id
                      )
                    })}
                  >
                    <NavLink
                      to={`/services/${product.id}`}
                      className="d-flex"
                    >
                      <img
                        alt={product.name}
                        src={'/assets/img/gfx-logo.jpg'}
                        className="list-thumbnail responsive border-0"
                      />
                    </NavLink>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                        <NavLink
                          to={`/services/${product.id}`}
                          className="w-40 w-sm-100"
                        >
                          <p className="list-item-heading mb-1 truncate">
                            {product.name}
                          </p>
                        </NavLink>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                          {product.created_at}
                        </p>
                      </div>
                      <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <CustomInput
                          className="itemCheck mb-0"
                          type="checkbox"
                          id={`check_${product.id}`}
                          checked={this.state.selectedItems.includes(
                            product.id
                          )}
                          onChange={() => {}}
                          label=""
                        />
                      </div>
                    </div>
                  </Card>
                </ContextMenuTrigger>
              </Colxx>
            );
          } else {
            return (
              <Colxx xxs="12" key={product.id} className="mb-3">
                <ContextMenuTrigger
                  id="menu_id"
                  data={product.id}
                  collect={collect}
                >
                  <Card
                    onClick={event =>
                      this.handleCheckChange(event, product.id)
                    }
                    className={classnames("d-flex flex-row", {
                      active: this.state.selectedItems.includes(
                        product.id
                      )
                    })}
                  >
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                        <NavLink
                          to={`/services/${product.id}`}
                          className="w-20 w-sm-50"
                        >
                          <p className="list-item-heading mb-1 truncate">
                            {product.name}
                          </p>
                        </NavLink>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                          {product.updated_at}
                        </p>
                      </div>
                      <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <CustomInput
                          className="itemCheck mb-0"
                          type="checkbox"
                          id={`check_${product.id}`}
                          checked={this.state.selectedItems.includes(
                            product.id
                          )}
                          onChange={() => {}}
                          label=""
                        />
                      </div>
                    </div>
                  </Card>
                </ContextMenuTrigger>
              </Colxx>
            );
          }
        })}
        <Pagination
          currentPage={this.state.currentPage}
          totalPage={this.state.totalPage}
          onChangePage={i => this.onChangePage(i)}
        />
        </Row>
      </Fragment>
    );
  }
}

export default injectIntl(mouseTrap(All))
