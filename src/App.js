import React, { Component } from "react";
import IndividualItem from "./components/IndividualItem";
// import pricingStructure from "./assets/pricingStructure";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

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
        img: require("./assets/Images/Banana.jpg")
      },
      {
        type: "Fair Trade Banana",
        productCode: "D",
        img: require("./assets/Images/Orange.jpg")
      }
    ]
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
              {this.state.itemsList.map((item, index) => {
                return (
                  <Col lg="3" md="6">
                    <IndividualItem item={item} />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}
