exports.calculateCost = (array, pricingStructure) => {
  if (!array.length) {
    return 0;
  } else {
    // if item is special priced it will be placed in this object
    let specialPriceItems = {};
    // if item is not spicial priced it will be added to the the cost below
    let singlePricedItemsCost = 0;
    let totalSpecials = {};
    array.forEach(item => {
      if (pricingStructure[item].hasOwnProperty("specialPrice")) {
        specialPriceItems[item] = Object.entries(
          pricingStructure[item].specialPrice
        )[0];
        if (totalSpecials.hasOwnProperty(item)) {
          totalSpecials[item]++;
        } else {
          totalSpecials[item] = 1;
        }
      } else {
        singlePricedItemsCost += pricingStructure[item].unitPrice;
      }
    });
    Object.keys(specialPriceItems).forEach(item => {
      if (totalSpecials[item] === 1) {
        singlePricedItemsCost += pricingStructure[item].unitPrice;
      }
      if (totalSpecials[item] % specialPriceItems[item][0] === 0) {
        singlePricedItemsCost += specialPriceItems[item][1];
      }
    });
    return singlePricedItemsCost;
  }
};
