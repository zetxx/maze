### Products
* user add cancel not working
* bnb service currency conversions
  ... curl http://www.bnb.bg/Statistics/StExternalSector/StExchangeRates/StERForeignCurrencies/index.htm?download=csv&search=&lang=B
  ... ```a.match(/(CAD|GBP|DKK)\,([\d]+)\,([\d]*\.*[\d]*)\,([\d]*\.*[\d]*)/ig).map((v) => (v.split(','))).map((v) =>({name: v[0], rate: v[3] / v[1]}))```
- add user currency option - web
- edit for supplier, category