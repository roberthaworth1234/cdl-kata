import React, { Component } from "react";
import IndividualItem from "./components/IndividualItem";
import { refPricingStructure } from "./assets/pricingStructure";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { calculateCost } from "./utils";

export default class App extends Component {
  state = {
    shoppingBasket: [],
    itemsList: [
      {
        type: "Pink Lady Apple",
        productCode: "A",
        img: require("./assets/Images/PinkLady.jpg")
      },
      {
        type: "Braeburn",
        productCode: "B",
        img: require("./assets/Images/Braeburn.jpg")
      },
      {
        type: "Valencia Orange",
        productCode: "C",
        img: require("./assets/Images/Orange.jpg")
      },
      {
        type: "Fair Trade Banana",
        productCode: "D",
        img: require("./assets/Images/Banana.jpg")
      }
    ]
  };
  handleClick = (direction, productCode) => {
    let count = 1;
    return direction === -1
      ? this.setState({
          shoppingBasket: this.state.shoppingBasket.filter(item => {
            return item === productCode && count === 1
              ? count-- && item !== productCode
              : item;
          })
        })
      : this.setState({
          shoppingBasket: [...this.state.shoppingBasket, productCode]
        });
  };
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="mt-3">Adam's Apple</h1>
          <div className="mb-5 underline"></div>
        </header>
        <section className="selection">
          <Container>
            <Row>
              {this.state.itemsList.map(item => {
                return (
                  <Col key={item.productCode} lg="3" md="6">
                    <IndividualItem
                      handleClick={this.handleClick}
                      item={item}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
        <section className="d-flex flex-column justify-content-center mt-5">
          <h2>Shopping Basket</h2>
          <div className="mb-5 underline"></div>
          {this.state.shoppingBasket.map((item, index) => {
            return (
              <Container key={index} className="basketContainer">
                {this.state.itemsList.map((product, index) => {
                  return product.productCode === item ? (
                    <p key={index}> {product.type}</p>
                  ) : null;
                })}
                <p>Price: {refPricingStructure[item].unitPrice}</p>
              </Container>
            );
          })}
          <p className="total">
            Total :{" "}
            {calculateCost(this.state.shoppingBasket, refPricingStructure)}
          </p>
        </section>
      </div>
    );
  }
}
