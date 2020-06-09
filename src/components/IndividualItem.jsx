import React from "react";
import { Button } from "react-bootstrap";

export default function IndividualItem({ item, handleClick, shoppingBasket }) {
  return (
    <div className={"item " + item.productCode}>
      <h3>{item.type}</h3>
      <div className="d-flex flex-column justify-content-center">
        <img
          className="img align-self-center my-4"
          alt={item.alt}
          src={item.img}
        />
        <span className="quantity">
          Quantity:{" "}
          {/* shopping basket mapped to select only that specific element in array and reduced to accumulate the quantity */}
          {!shoppingBasket.length
            ? 0
            : shoppingBasket
                .map(element => {
                  return item.productCode === element ? 1 : 0;
                })
                .reduce((acc, curr) => {
                  return acc + curr;
                })}
        </span>
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
      </div>
    </div>
  );
}
