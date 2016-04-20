const env = process.env.NODE_ENV || 'production'
const config = {
  development: {
    env: env,
    db: 'mysql://db:123@127.0.0.1:3306/maze',
    dbDialect: 'mysql',
    httpServer: {
      host: '0.0.0.0', port: 3000
    }
  },
  test: {
    env: env,
    db: 'mysql://db:123@maze-db:3306/maze',
    dbDialect: 'mysql',
    httpServer: {
      host: '0.0.0.0', port: 3000
    }
  },
  production: {
    env: env,
    db: 'mysql://db:123@maze-db:3306/maze',
    dbDialect: 'mysql',
    httpServer: {
      host: '0.0.0.0', port: 3000
    }
  }
}

module.exports = config[env]
