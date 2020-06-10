exports.calculateCost = (array, pricingStructure) => {
  if (!array.length) {
    return 0;
  } else {
    // if item is special priced it will be placed in this object with object entries of the special deal
    let specialPricedItems = {};
    // if item is single unit priced priced it will be added to the the cost below
    let totalCost = 0;
    // an object to track the total number of each special items
    let totalSpecials = {};
    array.forEach(item => {
      if (pricingStructure[item].hasOwnProperty("specialPrice")) {
        specialPricedItems[item] = Object.entries(
          pricingStructure[item].specialPrice
        )[0];
        totalSpecials.hasOwnProperty(item)
          ? totalSpecials[item]++
          : (totalSpecials[item] = 1);
      } else {
        totalCost += pricingStructure[item].unitPrice;
      }
    });
    // Next forEach checks if special priced item appears only once and adds single unit price to the total cost.
    Object.keys(specialPricedItems).forEach(item => {
      let remainder = totalSpecials[item] % specialPricedItems[item][0];
      if (totalSpecials[item] === 1) {
        totalCost += pricingStructure[item].unitPrice;
      } else if (remainder === 0) {
      /* checks if no remainder betweeen number of special items and how many times the special price is triggered. Multiply special price by how many times triggers and add to total cost.*/
        let factor = totalSpecials[item] / specialPricedItems[item][0];
        totalCost += specialPricedItems[item][1] * factor;
      } else if (remainder !== 0 && totalSpecials[item] > 1) {
      /* if remainder it multiples the remainder by single unit price and the nearest whole number of special items * special item price */
        const numberOfSpecials = Math.floor(
          totalSpecials[item] / +specialPricedItems[item][0]
        );
        totalCost +=
          pricingStructure[item].unitPrice * remainder +
          specialPricedItems[item][1] * numberOfSpecials;
      }
    });
    return totalCost;
  }
};

exports.tallyOccurences = (shoppingBasket, itemsList) => {
  if (!shoppingBasket.length) return [];
  let a = [],
    b = [],
    prev;

  shoppingBasket.sort();
  for (var i = 0; i < shoppingBasket.length; i++) {
    if (shoppingBasket[i] !== prev) {
      a.push(shoppingBasket[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = shoppingBasket[i];
  }

  return [a, b];
};
