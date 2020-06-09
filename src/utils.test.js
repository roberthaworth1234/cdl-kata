import "@testing-library/jest-dom/extend-expect";
const { refPricingStructure } = require("./assets/pricingStructure");
const { calculateCost, tallyOccurences } = require("./utils");

describe("calculateCost", () => {
  it("will take an empty array and return zero", () => {
    const input = calculateCost([]);
    expect(input).toEqual(0);
  });
  it("will take an array containing one single item and the pricing structure object and return the correct price", () => {
    const input = calculateCost(["A"], refPricingStructure);
    expect(input).toEqual(refPricingStructure["A"].unitPrice);
    expect(input).toEqual(50);
  });
  it("will take an array containing multiple unique items and the pricing structure object and return the correct price", () => {
    const input = calculateCost(["A", "B", "C"], refPricingStructure);
    expect(input).toEqual(
      refPricingStructure["A"].unitPrice +
        refPricingStructure["B"].unitPrice +
        refPricingStructure["C"].unitPrice
    );
    expect(input).toEqual(100);
  });
  it("will take an array containing multiple items, one item which triggers the special price cost.  And will produce the correct calculated cost", () => {
    const input = calculateCost(["A", "B", "B", "C"], refPricingStructure);
    expect(input).toEqual(
      refPricingStructure["A"].unitPrice +
        refPricingStructure["B"].specialPrice[2] +
        refPricingStructure["C"].unitPrice
    );
    expect(input).toEqual(115);
  });
  it("will take an array containing multiple items, two of which trigger the special price.  Will produce correct calulated cost", () => {
    const input = calculateCost(
      ["A", "A", "A", "B", "B", "C", "D"],
      refPricingStructure
    );
    expect(input).toEqual(210);
  });
  it("will take an array containing multiple items, one of which is larger than the required number in the special deal.  Will produce the correct result factoring in the special and unit price.", () => {
    const input = calculateCost(["A", "B", "B", "B", "C"], refPricingStructure);
    expect(input).toEqual(145);
  });
  it("will take an array containing multipe items, with excessive duplicate numbers of each item, and return the correct total cost", () => {
    const input = calculateCost(
      ["A", "A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "B", "C", "C"],
      refPricingStructure
    );
    expect(input).toEqual(470);
  });
  it("will take an array containing multipe items. A's equalling the required special target price and B's with a remainder. and return the correct total cost", () => {
    const input = calculateCost(
      [
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "B",
        "B",
        "B",
        "B",
        "B",
        "C",
        "C",
        "C",
        "D",
        "D"
      ],
      refPricingStructure
    );
    expect(input).toEqual(470);
  });
});

const itemsList = [
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
];

describe("tallyOccurences", () => {
  it("will take an empty basket and items and return an empty array", () => {
    const input = tallyOccurences([], itemsList);
    expect(input).toEqual([]);
  });
  it("will take a basket containing 1 item and itemsList and return array containing the item and an array containing 1", () => {
    const input = tallyOccurences(["A"], itemsList);
    expect(input).toEqual([["A"], [1]]);
  });
  it("will take a basket containing 1 item and itemsList and return array containing the item and an array containing the number of each item", () => {
    const input = tallyOccurences(
      ["A", "B", "A", "B", "C", "D", "C", "A"],
      itemsList
    );
    expect(input).toEqual([
      ["A", "B", "C", "D"],
      [3, 2, 2, 1]
    ]);
  });
});
