import React, { PureComponent } from 'react'

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  render() {
    return (
      {!this.state.items.length > 0
        ? <EmptyRow />
        : this.state.items.map(product => {
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
                      to={`/customers/${product.id}`}
                      className="w-40 w-sm-100"
                    >
                      <CardImg
                        top
                        alt={product.firstname}
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
                          id={`check_${product.id}`}
                          checked={this.state.selectedItems.includes(
                            product.id
                          )}
                          onChange={() => {}}
                          label=""
                        />
                      </Colxx>
                      <Colxx xxs="10" className="mb-3">
                        <CardSubtitle>{product.firstname}</CardSubtitle>
                        {" "}
                        <CardSubtitle>{product.lastname}</CardSubtitle>
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
                    to={`/customers/${product.id}`}
                    className="d-flex"
                  >
                    <img
                      alt={product.firstname}
                      src={'/assets/img/default-service.png'}
                      className="list-thumbnail responsive border-0"
                    />
                  </NavLink>
                  <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                    <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                      <NavLink
                        to={`/customers/${product.id}`}
                        className="w-40 w-sm-100"
                      >
                        <p className="list-item-heading mb-1 truncate">
                          {product.firstname} {' - '} {product.lastname}
                        </p>
                      </NavLink>
                      <p className="mb-1 text-muted text-small w-15 w-sm-100">
                        {product.gfx_id}
                      </p>
                      <p className="mb-1 text-muted text-small w-15 w-sm-100">
                        {product.created_at}
                      </p>
                      <div className="w-15 w-sm-100">
                        <Badge color={product.statusColor} pill>
                          {product.phone}
                        </Badge>
                      </div>
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
                        to={`/customers/${product.id}`}
                        className="w-20 w-sm-50"
                      >
                        <p className="list-item-heading mb-1 truncate">
                          {product.firstname}
                        </p>
                      </NavLink>
                      <NavLink
                        to={`/customers/${product.id}`}
                        className="w-20 w-sm-50"
                      >
                        <p className="list-item-heading mb-1 truncate">
                          {product.lastname}
                        </p>
                      </NavLink>
                      <p className="mb-1 text-muted text-small w-15 w-sm-100">
                        {product.phone}
                      </p>
                      <p className="mb-1 text-muted text-small w-15 w-sm-100">
                        {product.email}
                      </p>
                      <p className="mb-1 text-muted text-small w-15 w-sm-100">
                        {product.updated_at}
                      </p>
                      <div className="w-15 w-sm-100">
                        <Badge color={product.statusColor} pill>
                          {product.gfx_id}
                        </Badge>
                      </div>
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
    )
  }
}
