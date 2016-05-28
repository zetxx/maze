# Maze
shop/bar/storage manager

## Install

* clone
* npm install
* db config is located @ `./config/server`
* run `./node_modules/sequelize-cli/bin/sequelize db:migrate`
* run `./node_modules/sequelize-cli/bin/sequelize db:seed:all`

### ToDo
- add product enchantment
  - negative value should be allowed
    - do update
      - if nothing is returned add the product
      - if something is returned
        - delete item only if result is <= 0
- login
- config
  - repository
    - add quantity per store
    - field for bar code
  - global config
    - global language
    - user language
  - ability to add stores
