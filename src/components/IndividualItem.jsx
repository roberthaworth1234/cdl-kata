import React from "react";
import { Button } from "react-bootstrap";

export default function IndividualItem({ item }) {
  return (
    <div className={"item " + item.productCode}>
      <h3>{item.type}</h3>
      <div className="d-flex flex-column justify-content-center">
        <img
          className="img align-self-center my-4"
          alt="apple"
          src={item.img}
        />
        <Button className="my-1">-</Button>
        <Button>+</Button>
      </div>
    </div>
  );
}
