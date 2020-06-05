exports.calculateCost = (array, pricingStructure) => {
  if (!array.length) {
    return 0;
  } else {
    // if item is special priced it will be placed in this object with object entries of special deal
    let specialPriceItems = {};
    // if item is not spicial priced it will be added to the the cost below
    let totalCost = 0;
    // an object to track the total number of each special item
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
        totalCost += pricingStructure[item].unitPrice;
      }
    });
    Object.keys(specialPriceItems).forEach(item => {
      if (totalSpecials[item] === 1) {
        totalCost += pricingStructure[item].unitPrice;
      }
      if (totalSpecials[item] % specialPriceItems[item][0] === 0) {
        totalCost += specialPriceItems[item][1];
      }
      if (
        totalSpecials[item] % specialPriceItems[item][0] !== 0 &&
        totalSpecials[item] > 1
      ) {
        totalCost +=
          pricingStructure[item].unitPrice + specialPriceItems[item][1];
      }
    });
    return totalCost;
  }
};
