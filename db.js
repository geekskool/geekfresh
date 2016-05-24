var Sequelize = require('Sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/foodinventory.sqlite'
});

var db = {};

db.menu = sequelize.import(__dirname +'/models/menu.js');

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
