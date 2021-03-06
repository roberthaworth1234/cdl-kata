import React from "react";
import { Container, Button } from "react-bootstrap";
import { refPricingStructure } from "../assets/pricingStructure";
import { calculateCost, tallyOccurences } from "../assets/utils";

export default function ShoppingBasket({
  shoppingBasket,
  itemsList,
  handleRemove
}) {
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
        {basketFunc(shoppingBasket, itemsList, handleRemove)}
      </Container>
      <div className="mb-2 underline w-50"></div>
      <Container className="d-flex flex-column">
        <span className="sub-total">
          Sub-Total : £{(subTotal / 100).toFixed(2)}
        </span>

        {subTotal > calculatedCost ? (
          <span className="savings my-1">
            Your total savings today £
            {((subTotal - calculatedCost) / 100).toFixed(2)}
          </span>
        ) : null}

        <span className="total my-2">
          Total : £{(calculatedCost / 100).toFixed(2)}
        </span>
      </Container>
    </>
  );
}

const basketFunc = (shoppingBasket, itemsList, handleRemove) => {
  /*tally occurences is a util function in the assets folder that gives back an array containing two arrays. One containing the item i.e [A,B,C] and the other containing how many times it occured in the basket*/
  const occurences = tallyOccurences(shoppingBasket, itemsList);
  return occurences[0].map((item, i) => {
    return itemsList.map((product, index) => {
      return product.productCode === item ? (
        <ul key={index} className="basketItem">
          <li>
            {" "}
            {product.type} x {occurences[1][i]}
          </li>
          <Button
            className="removeBtn"
            variant="info"
            onClick={() => {
              handleRemove(product.productCode);
            }}
          >
            X
          </Button>
          <li>
            £{" "}
            {(
              (refPricingStructure[item].unitPrice * occurences[1][i]) /
              100
            ).toFixed(2)}
          </li>
        </ul>
      ) : null;
    });
  });
};
