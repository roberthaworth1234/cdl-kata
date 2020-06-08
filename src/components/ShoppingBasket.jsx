import React from "react";
import { Container } from "react-bootstrap";
import { refPricingStructure } from "../assets/pricingStructure";
import { calculateCost } from "../utils";

export default function ShoppingBasket({ shoppingBasket, itemsList }) {
  const calculatedCost = calculateCost(shoppingBasket, refPricingStructure);
  const subTotal = shoppingBasket
    .map(item => {
      let price = refPricingStructure[item].unitPrice;
      return price;
    })
    .reduce((acc, curr) => {
      return acc + curr;
    });
  return (
    <>
      <h2>Shopping Basket</h2>
      <div className="mb-5 underline"></div>
      {shoppingBasket.map((item, index) => {
        return (
          <Container key={index} className="basketContainer">
            {itemsList.map((product, index) => {
              return product.productCode === item ? (
                <p key={index}> {product.type}</p>
              ) : null;
            })}
            <p>Price: {refPricingStructure[item].unitPrice}p</p>
          </Container>
        );
      })}
      <p className="total">Sub-Total : £{(subTotal / 100).toFixed(2)}</p>
      {subTotal > calculatedCost ? (
        <p className="savings">
          Your total savings today is £
          {((subTotal - calculatedCost) / 100).toFixed(2)}
        </p>
      ) : null}
      <p className="total">Total : £{(calculatedCost / 100).toFixed(2)}</p>
    </>
  );
}
