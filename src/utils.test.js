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
});
