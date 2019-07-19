import React, { PureComponent } from 'react'
import {EmptyRow} from '../../Components/empty';
import {
  Row, Card, CustomInput, CardBody, CardSubtitle, CardImg,
  CardText, Badge
} from "reactstrap";
import { Colxx } from "../../Components/CustomBootstrap";
import { ContextMenuTrigger } from "react-contextmenu";
import { NavLink } from "react-router-dom";
import Pagination from "../../Components/List/Pagination";

function collect(props) {
  return { data: props.data };
}

import classnames from "classnames";

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  // helper section
  getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  def = product => ([
    {name: product.id, key: true },
    {link: {to: `customers/${product.id}`}, name: product.firstname, },
    {link: {to: `customers/${product.id}`}, name: product.lastname, },
    {name: `${product.country_code} ${product.phone}`, badge: true},
    {name: `${product.email}`},
    {name: `${product.state}, ${product.country}`},
  ]);

  render() {
  const {
    selectedItems, handleCheckChange, displayMode,
    onChangePage, selectedPageSize, items, totalPage,
    currentPage, totalItemCount
  } = this.props
  return (
    <Row>
      {!items.length > 0
        ? <EmptyRow />
        : items.map((product, i) => {
        if (displayMode === "imagelist") {
          return (
            <this.ImageList key={i}
            products={this.def(product)} />
          );
        } else if (displayMode === "thumblist") {
          return (
            <this.ThumbList key={i}
            products={this.def(product)} />
          );
        } else {
          return (
            <this.List key={i}
              products={this.def(product)}
            />
          );
        }
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={onChangePage}
      />
      </Row>
    )
  }

  List = ({products}) => (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger
        id="menu_id"
        data={products[0]['name']}
        collect={collect}
      >
        <Card
          onClick={event =>
            this.props.handleCheckChange(event, products[0]['name'])
          }
          className={classnames("d-flex flex-row", {
            active: this.props.selectedItems.includes(
              products[0]['name']
            )
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

              {products.map((product, i) => (
                !product.key && (product.link
                ? <NavLink key={i}
                  to={`${product.link.to}`}
                  className="w-10 w-sm-50"
                >
                  <p key={i} className="list-item-heading mb-1 truncate">
                    {product['name']}
                  </p>
                </NavLink>
                : product.badge
                ? <div key={i} className="w-10 w-sm-100">
                    <Badge key={i} color={product.statusColor} pill>
                      {product['name']}
                    </Badge>
                  </div>
                : <p key={i} className="text-muted text-small list-item-heading mb-1 truncate">
                    {product['name']}
                  </p>
                )))}
                </div>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <CustomInput
                    className="itemCheck mb-0"
                    type="checkbox"
                    id={`check_${products[0]['name']}`}
                    checked={this.props.selectedItems.includes(
                      products[0]['name']
                    )}
                    onChange={() => {}}
                    label=""
                  />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  )

    ImageList = ({products}) => (
      <Colxx
        sm="6"
        lg="4"
        xl="3"
        className="mb-3"
        key={products[0]['name']}
      >
        <ContextMenuTrigger
          id="menu_id"
          data={products[0]['name']}
          collect={collect}
        >
          <Card
            onClick={event =>
              this.props.handleCheckChange(event, products[0]['name'])
            }
            className={classnames({
              active: this.props.selectedItems.includes(
                products[0]['name']
              )
            })}
          >
            <div className="position-relative">
              <NavLink
                to={`/customers/${products[0]['name']}`}
                className="w-40 w-sm-100"
              >
                <CardImg
                  top
                  alt={products[0]['name']}
                  src={'/assets/img/default-service.png'}
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
                    id={`check_${products[0]['name']}`}
                    checked={this.props.selectedItems.includes(
                      products[0]['name']
                    )}
                    onChange={() => {}}
                    label=""
                  />
                </Colxx>
                <Colxx xxs="10" className="mb-3">
                {products.map((product, i) => (
                  !product.key && (product.link
                  ? <CardSubtitle className="text-muted text-small" key={i}>{product.name}{" "}</CardSubtitle>
                  : product.badge
                  ? <div key={i} className="">
                    <Badge color={product.statusColor} pill>
                      {product.name}
                    </Badge>
                  </div>
                  : <CardText key={i} className="text-muted text-small mb-0 font-weight-light">
                    {product.name}
                  </CardText>
                  )))}
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
    )

    ThumbList = ({products}) => (
      <Colxx xxs="12" key={products[0]['name']} className="mb-3">
        <ContextMenuTrigger
          id="menu_id"
          data={products[0]['name']}
          collect={collect}
        >
          <Card
            onClick={event =>
              this.props.handleCheckChange(event, products[0]['name'])
            }
            className={classnames("d-flex flex-row", {
              active: this.props.selectedItems.includes(
                products[0]['name']
              )
            })}
          >
            <NavLink
              to={`/customers/${products[0]['name']}`}
              className="d-flex"
            >
              <img
                alt={products[1]['name']}
                src={'/assets/img/default-service.png'}
                className="list-thumbnail responsive border-0"
              />
            </NavLink>
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              {products.map((product, i) => (
                !product.key && (product.link
                ? <NavLink key={i}
                  to={`/customers/${products[0]['name']}`}
                  className="w-5 w-sm-100"
                >
                  <p className="list-item-heading mb-1 truncate">
                    {product.name} {''} {''}
                  </p>
                </NavLink>
                : product.badge
                ? <div key={i} className="w-15 w-sm-100">
                  <Badge color={product.statusColor} pill>
                    {product.name}
                  </Badge>
                </div>
                : <p key={i} className="mb-1 text-muted text-small w-15 w-sm-100">
                  {product.name}
                </p>
              )))}
              </div>
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <CustomInput
                  className="itemCheck mb-0"
                  type="checkbox"
                  id={`check_${products[0]['name']}`}
                  checked={this.props.selectedItems.includes(
                    products[0]['name']
                  )}
                  onChange={() => {}}
                  label=""
                />
              </div>
            </div>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
    )

}
