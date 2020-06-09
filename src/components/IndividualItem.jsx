import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class IndividualItem extends Component {
  state = {
    value: 0
  };

  handleChange(event) {
    this.setState({ value: event });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateBasket(this.state.value, this.props.item.productCode);
    this.setState({ value: 0 });
  }

  render() {
    const { item, handleClick } = this.props;
    return (
      <div className={"item " + item.productCode}>
        <h3>{item.type}</h3>
        <div className="d-flex flex-column justify-content-center">
          <img
            className="img align-self-center my-4"
            alt={item.alt}
            src={item.img}
          />

          <Button
            className="my-1"
            onClick={() => {
              handleClick(-1, item.productCode);
            }}
          >
            -
          </Button>
          <Button
            className="mb-4"
            onClick={() => {
              handleClick(+1, item.productCode);
            }}
          >
            +
          </Button>
          <form
            onSubmit={e => {
              this.handleSubmit(e);
            }}
          >
            <label>
              Set Quantity :
              <input
                className="w-25"
                type="number"
                value={this.state.value}
                onChange={e => {
                  this.handleChange(e.target.value);
                }}
              />
            </label>
            <Button className="w-100" variant="warning" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
