module.exports = function(sequelize, DataTypes) {
// create table menu(name varchar(), description varchar(), quantity INT()..)
    return sequelize.define('menu', {

        name: {
            type: DataTypes.STRING,
            allowNUll: false,

        },
        description: {
            type: DataTypes.STRING,
            allowNUll: false,

        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNUll: false,

        },
        ingredients: {
            type: DataTypes.STRING,
            allowNUll: false,

        },
        category: {
            type: DataTypes.STRING,
            allowNUll: false,

        },
        cost: {
            type: DataTypes.FLOAT,
            allowNUll: false,

        },
        image: {
            type: DataTypes.STRING,
            allowNUll: false,

        },
        location: {
            type: DataTypes.STRING,
            allowNUll: false,

        }

    });

};
