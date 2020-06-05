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
});
