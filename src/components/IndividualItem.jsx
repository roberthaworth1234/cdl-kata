import React from "react";

export default function IndividualItem({ item }) {
  return (
    <div className={"item " + item.productCode}>
      <h2>{item.type}</h2>
      <img
        className="img"
        alt="apple"
        src={require("../assets/Images/Braeburn2008.jpg")}
      />
    </div>
  );
}
