const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Rent = sequelize.define('Rent', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   address: {
       type: Sequelize.STRING,
       allowNull: false,
       
   },
    rentalDate: {
       type: Sequelize.DATE,
       allowNull: false,
       validate: {
            notEmpty: {
                msg: "The field is required"
            },

       }
   },
    returnDate: {
       type: Sequelize.DATE,
       allowNull: true,
   },

   /*
   isAfter: {
        args: [new Date().toISOString().split("T")[0]],
        msg: 'futureDate'
    }
    */
   customer_id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
            notEmpty: {
                msg: "The field is required"
            },
       }
   },
   car_id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
            notEmpty: {
                msg: "The field is required"
            },
        }
    }
});

module.exports = Rent;