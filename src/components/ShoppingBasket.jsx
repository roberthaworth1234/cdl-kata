import React from "react";
import { Container } from "react-bootstrap";
import { refPricingStructure } from "../assets/pricingStructure";
import { calculateCost } from "../utils";

export default function ShoppingBasket({ shoppingBasket, itemsList }) {
  const calculatedCost = calculateCost(shoppingBasket, refPricingStructure);
  //subTotal calculated mapping the single unit price of each item and reduce the accumulated array.
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
      <Container>
        {shoppingBasket.map((item, index) => {
          return itemsList.map((product, index) => {
            return product.productCode === item ? (
              <ul key={index} className="basketItem">
                <li> {product.type}</li>
                <li>Price: {refPricingStructure[item].unitPrice}p</li>
              </ul>
            ) : null;
          });
        })}
      </Container>
      <div className="mb-2 underline w-50"></div>
      <span className="total">Sub-Total : £{(subTotal / 100).toFixed(2)}</span>
      {subTotal > calculatedCost ? (
        <span className="savings my-1">
          Your total savings today is £
          {((subTotal - calculatedCost) / 100).toFixed(2)}
        </span>
      ) : null}
      <span className="total mt-1">
        Total : £{(calculatedCost / 100).toFixed(2)}
      </span>
    </>
  );
}
