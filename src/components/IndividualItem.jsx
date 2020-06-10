import React, { Component } from "react";
import { refPricingStructure } from "../assets/pricingStructure";
import { Button } from "react-bootstrap";

export default class IndividualItem extends Component {
  state = {
    inputValue: 0
  };

  handleChange(event) {
    this.setState({ inputValue: +event });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateBasket(this.state.inputValue, this.props.item.productCode);
  }

  handleInputValue = arg => {
    this.setState(currentState => {
      return { inputValue: +currentState.inputValue + arg };
    });
  };
  render() {
    const { item, handleClick } = this.props;
    return (
      <div className={"mt-5 item " + item.productCode}>
        <h3>{item.type}</h3>
        <div className="d-flex flex-column justify-content-center">
          <img
            className="img align-self-center my-4"
            alt={item.alt}
            src={item.img}
          />

          <Button
            className="my-1"
            onClick={e => {
              handleClick(-1, item.productCode, this.handleInputValue);
            }}
          >
            -
          </Button>
          <Button
            className="mb-2"
            onClick={e => {
              handleClick(+1, item.productCode, this.handleInputValue);
            }}
          >
            +
          </Button>
          <span className="price">
            {refPricingStructure[item.productCode].unitPrice}p
          </span>
          <form
            onSubmit={e => {
              this.handleSubmit(e);
            }}
          >
            <label>
              Set Quantity :
              <input
                className="w-25 align-items-center"
                type="number"
                value={this.state.inputValue}
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
