import React, { Component } from "react";
import IndividualItem from "./components/IndividualItem";
// import pricingStructure from "./assets/pricingStructure";
import "./App.css";

export default class App extends Component {
  state = {
    shoppingBasket: [],
    itemsList: [
      { type: "Pink Lady Apple", productCode: "A" },
      { type: "Braeburn", productCode: "B" },
      { type: "Valencia Orange", productCode: "C" },
      { type: "Fair Trade Banana", productCode: "D" }
    ]
  };
  render() {
    return (
      <div className="App">
        <header>
          <h1>Adam's Apple</h1>
          <div className="underline"></div>
        </header>
        <section className="selection">
          {this.state.itemsList.map(item => {
            return <IndividualItem item={item} />;
          })}
        </section>
      </div>
    );
  }
}
