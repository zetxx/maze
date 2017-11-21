# Maze
shop/bar/storage manager

## Install

* clone
* npm install
* db config is located @ `./config/server`
* run `./node_modules/.bin/sequelize db:migrate`
* run `./node_modules/.bin/sequelize db:seed:all`

### ToDo
- config
  - repository
    - ~~field for bar code~~
    - ~~add stores~~
    - ~~load quantuty in specific store~~
  - global config
    - ~~global language~~
  - user management
    - users
    - user groups
    - actions (get,post...)
    - user language
- login page

users
groups
userGroup (user is member of group)
actions
permissions (action is member of permission with some right)