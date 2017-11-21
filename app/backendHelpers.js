const request = require('superagent')
const binaryParser = require('superagent-binary-parser')
const round = (number, precision) => {
  var factor = Math.pow(10, precision)
  var tempNumber = number * factor
  var roundedTempNumber = Math.round(tempNumber)
  return roundedTempNumber / factor
}

const priceDiffCalc = (price, percentage, hardValue, simpleAdd) => {
  return round(((price * ((percentage / 100) + 1)) + hardValue) - price, 2)
}

module.exports.round = round

var simpleAdd = false

module.exports.priceRuleExtract = (priceRuleGroups) => {
  return (priceRuleGroups || []).reduce((a, c) => {
    return a.concat(c.priceRules)
  }, [])
}

module.exports.priceCalc = (priceRules) => {
  return (p) => {
    var simpleAddSum = 0

    return priceRules.reduce((price, priceRule) => {
      if (
        (priceRule.rule === '>' && price > priceRule.ruleValueFrom) ||
        (priceRule.rule === '<' && price < priceRule.ruleValueFrom) ||
        (priceRule.rule === 'between' && price >= priceRule.ruleValueFrom && price <= priceRule.ruleValueTo)
      ) {
        var priceDiff = priceDiffCalc(price, priceRule.percentage, priceRule.hardValue, simpleAdd)
        if (!simpleAdd) {
          price = price + priceDiff
        } else {
          simpleAddSum = simpleAddSum + priceDiff
        }
        return price
      }

      return price
    }, p) + simpleAddSum
  }
}

const currencyRates = require('./CurrencyRates/model')
module.exports.currencyConversion = () => {
  setTimeout(module.exports.currencyConversion, 60000 * 60 * 24)
  request
    .get('http://www.bnb.bg/Statistics/StExternalSector/StExchangeRates/StERForeignCurrencies/index.htm')
    .query({download: 'csv'})
    .parse(binaryParser)
    .buffer()
    .then((result) => {
      let data = result
        .body
        .toString('utf8')
        .match(/(USD|EUR|JPY|GBP|RUB),([\d]+),([\d]*\.*[\d]*),([\d]*\.*[\d]*)/ig)
        .map((v) => (v.split(',')))
        .map((v) => ({currency: v[0], rate: v[3] / v[1]}))

      currencyRates
        .destroy({truncate: true})
        .then(() => {
          currencyRates
            .bulkCreate(data)
        })
    })
}
