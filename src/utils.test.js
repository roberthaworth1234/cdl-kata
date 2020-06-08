import "@testing-library/jest-dom/extend-expect";
const { refPricingStructure } = require("./assets/pricingStructure");
const { calculateCost } = require("./utils");

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
