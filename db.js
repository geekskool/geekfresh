var Sequelize = require('Sequelize');
var sequelize = Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/foodinventory.sqlite'
});

var db = {};

var menu = sequelize.import(__dirname + '/models/menu.js');
db.menu = menu;
db.Sequelize = Sequelize;
db.sequelize = sequelize;
