module.exports.round = (number, precision) => {
    var factor = Math.pow(10, precision)
    var tempNumber = number * factor
    var roundedTempNumber = Math.round(tempNumber)
    return roundedTempNumber / factor
}

module.exports.priceCalc = (priceRule) => {
  return (items) => {
    return items.map((item) => {
      if (priceRule.rule === '>') {
        if (item.price > priceRule.ruleValue) {
          return Object.assign(item, {price: module.exports.round((item.price * ((priceRule.percentage / 100) + 1)) + priceRule.hardValue, 2)})
        }
      } else if (priceRule.rule === '<') {
        if (item.price < priceRule.ruleValue) {
          return Object.assign(item, {price: module.exports.round((item.price * ((priceRule.percentage / 100) + 1)) + priceRule.hardValue, 2)})
        }
      } else {
        throw new Error('unknown price rule')
      }
    })
  }
}