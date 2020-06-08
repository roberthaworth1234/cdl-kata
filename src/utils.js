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
    // Next forEach checks if special priced item appears only once and adds single unit price to the total cost.
    Object.keys(specialPriceItems).forEach(item => {
      let remainder = totalSpecials[item] % specialPriceItems[item][0];
      if (totalSpecials[item] === 1) {
        totalCost += pricingStructure[item].unitPrice;
      }
      // checks if no remainder betweeen number of special items and how many times the special price is triggered. Multiply special price by how many times triggers and add to total cost.
      else if (remainder === 0) {
        let factor = totalSpecials[item] / specialPriceItems[item][0];
        totalCost += specialPriceItems[item][1] * factor;
      }
      // checks the remainder of special items.  adds unit priced of remainder and the number of triggered special priced items.
      else if (remainder !== 0 && totalSpecials[item] > 1) {
        const numberOfSpecials = Math.floor(
          totalSpecials[item] / +specialPriceItems[item][0]
        );
        totalCost +=
          pricingStructure[item].unitPrice * remainder +
          specialPriceItems[item][1] * numberOfSpecials;
      }
    });
    return totalCost;
  }
};
