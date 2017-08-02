module.exports.round = (number, precision) => {
    var factor = Math.pow(10, precision)
    var tempNumber = number * factor
    var roundedTempNumber = Math.round(tempNumber)
    return roundedTempNumber / factor
}

module.exports.priceCalc = (priceRule) => {
  return (price) => {
    if (priceRule.rule === '>') {
      if (price > priceRule.ruleValue) {
        return module.exports.round((price * ((priceRule.percentage / 100) + 1)) + priceRule.hardValue, 2)
      }
    } else if (priceRule.rule === '<') {
      if (price < priceRule.ruleValue) {
        return module.exports.round((price * ((priceRule.percentage / 100) + 1)) + priceRule.hardValue, 2)
      }
    } else {
      throw new Error('unknown price rule')
    }
    return price
  }
}