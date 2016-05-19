const config = require('./config/server')
const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const Path = require('path')
const HapiSwagger = require('hapi-swagger')
const webpackPlugin = require('./config/webpack.js')

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

var plugins = [
  Inert,
  Vision,
  {
    'register': HapiSwagger,
    'options': {
      info: {
        'title': 'Test API Documentation',
        'version': Pack.version || '0'
      }
    }
  }
]
if (webpackPlugin) {
  plugins.push(webpackPlugin)
}

server.register(plugins,
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
  }
)

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

// register dynamic routes
require('./app/Management/ProductCat/route.js')(server.route.bind(server))
require('./app/Management/Product/route.js')(server.route.bind(server))
require('./app/Management/Repository/route.js')(server.route.bind(server))
require('./app/StoreProductSearch/route.js')(server.route.bind(server))
require('./app/Basket/route')(server.route.bind(server))
require('./app/BasketList/route')(server.route.bind(server))
require('./app/Management/Config/route')(server.route.bind(server))
