# Maze
shop/bar/storage manager

## Install

* clone
* npm install
* db config is located @ `./config/server`
* run `./node_modules/sequelize-cli/bin/sequelize db:migrate`
* run `./node_modules/sequelize-cli/bin/sequelize db:seed:all`

### ToDo
- config
  - repository
    - add quantity per store
    - ~~field for bar code~~
  - global config
    - global language
    - user language
  - ability to add stores
- login