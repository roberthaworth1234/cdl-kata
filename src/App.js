import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import IndividualItem from "./components/IndividualItem";
import ShoppingBasket from "./components/ShoppingBasket";

import "./App.css";

export default class App extends Component {
  state = {
    shoppingBasket: [],
    itemsList: [
      {
        type: "Pink Lady Apple",
        productCode: "A",
        img: require("./assets/Images/PinkLady.jpg"),
        alt: "A Pink Lady Apple"
      },
      {
        type: "Braeburn",
        productCode: "B",
        img: require("./assets/Images/Braeburn.jpg"),
        alt: "A Braeburn Apple"
      },
      {
        type: "Valencia Orange",
        productCode: "C",
        img: require("./assets/Images/Orange.jpg"),
        alt: "A Valencia Orange"
      },
      {
        type: "Fair Trade Banana",
        productCode: "D",
        img: require("./assets/Images/Banana.jpg"),
        alt: "A Fair Trade Banana"
      }
    ]
  };

  handleClick = (direction, productCode, handleInputValue) => {
    /*ternary based on the direction of clicked. if -1 clicked the filter will remove one item from basket array that matches product code and set the new shopping basket in state. any other use of handle click function adds product to the basket.*/
    handleInputValue(direction);
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

  updateBasket = (value, productCode) => {
    //Input amount from individual item input form and updates the basket

    const newArr = this.state.shoppingBasket.filter(item => {
      return item !== productCode;
    });
    for (let i = 0; i < value; i++) {
      newArr.push(productCode);
    }
    this.setState({ shoppingBasket: newArr });
  };

  handleRemove = productCode => {
    const newBasket = this.state.shoppingBasket.filter(item => {
      return item !== productCode;
    });
    this.setState({ shoppingBasket: newBasket });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="mt-3">Adam's Apples</h1>
          <div className="mb-5 underline"></div>
        </header>
        <section className="selection">
          <Container>
            <Row>
              {this.state.itemsList.map(item => {
                return (
                  <Col key={item.productCode} lg="3" md="6">
                    <IndividualItem
                      updateBasket={this.updateBasket}
                      shoppingBasket={this.state.shoppingBasket}
                      handleClick={this.handleClick}
                      itemRemoved={this.state.itemRemoved}
                      item={item}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
        {this.state.shoppingBasket.length ? (
          <section className="d-flex flex-column justify-content-center mt-5">
            <ShoppingBasket
              handleRemove={this.handleRemove}
              shoppingBasket={this.state.shoppingBasket}
              itemsList={this.state.itemsList}
            />
          </section>
        ) : null}
      </div>
    );
  }
}
