const config = require('./config/server')
const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const Path = require('path')
const HapiSwagger = require('hapi-swagger')
const webpackFrontendWatch = require('./config/webpack.js').watch

const Pack = require('./package')

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, './public')
      }
    }
  }
})
server.connection(config.httpServer)

server.register([
  Inert,
  Vision, {
    'register': HapiSwagger,
    'options': {
      info: {
        'title': 'Test API Documentation',
        'version': Pack.version || '0'
      }
    }
  }],
(err) => {
  if (err) {
    console.error(err)
  } else {
    server.start((err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Server running at:', server.info.uri)
      }
    })
  }
})

server.route([{
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
}, {
  method: 'GET',
  path: '/favicon.ico',
  handler: { file: './assets/favicon.ico' }
}])
webpackFrontendWatch(server)
// time services
require('./app/backendHelpers').currencyConversion()

// register dynamic routes
require('./app/Manage/ProductCat/route.js')(server.route.bind(server))
require('./app/Manage/Supplier/route.js')(server.route.bind(server))
require('./app/Manage/Product/route.js')(server.route.bind(server))
require('./app/Manage/QuantityType/route.js')(server.route.bind(server))
require('./app/Manage/Repository/route.js')(server.route.bind(server))
require('./app/StoreProductSearch/route.js')(server.route.bind(server))
require('./app/Basket/route')(server.route.bind(server))
require('./app/BasketList/route')(server.route.bind(server))
require('./app/Manage/Config/route')(server.route.bind(server))
require('./app/Manage/Config/Shop/route')(server.route.bind(server))
require('./app/Manage/Users/Roles/route')(server.route.bind(server))
require('./app/Manage/Users/User/route')(server.route.bind(server))
require('./app/Manage/Users/User/Add/route')(server.route.bind(server))
require('./app/Manage/Users/User/Edit/route')(server.route.bind(server))
require('./app/Manage/Users/Actions/route')(server.route.bind(server))
require('./app/Manage/Users/Role/Add/route')(server.route.bind(server))
require('./app/Manage/Users/Role/Edit/route')(server.route.bind(server))
require('./app/Upload/route')(server.route.bind(server))
require('./app/Manage/Files/route')(server.route.bind(server))
require('./app/Manage/PriceRules/route')(server.route.bind(server))
require('./app/Manage/Users/User/PasswordReset/route')(server.route.bind(server))
require('./app/Manage/PriceRule/Add/route')(server.route.bind(server))
require('./app/Manage/PriceRule/Edit/route')(server.route.bind(server))
require('./app/Manage/PriceRuleGroups/route')(server.route.bind(server))
require('./app/Manage/PriceRuleGroups/Add/route')(server.route.bind(server))
require('./app/Manage/PriceRuleGroups/Edit/route')(server.route.bind(server))
