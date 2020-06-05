exports.calculateCost = (array, pricingStructure) => {
  if (!array.length) {
    return 0;
  } else {
    return pricingStructure[array[0]].unitPrice;
  }
};
