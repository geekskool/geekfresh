module.exports = function(sequelize, DataTypes) {

    return sequelize.define('checkout', {

        name: {

            type: DataTypes.STRING,
            allowNUll: false,

        },

        quantity: {

            type: DataTypes.INTEGER,
            allowNUll: false,

        },

        cost:{
        	type: DataTypes.INTEGER,
            allowNUll: false,

        }


    });



};
