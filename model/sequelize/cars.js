const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Car = sequelize.define('Cars', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
    carModel: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
           notEmpty: {
               msg: "The field is required"
           },
           len: {
               args: [3, 60],
               msg: "The field should contain from 3 to 60 characters"
           },
       }
   },
    VIN: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
            notEmpty: {
                msg: "The field is required"
            },
            len: {
                args: [3, 60],
                msg: "The field should contain from 3 to 60 characters"
            },
        }
    },

    manufactured: {
       type: Sequelize.STRING,
       allowNull: true
   },
    NumberOfCars: {
       type: Sequelize.INTEGER,
       allowNull: true,
       validate: {
           isNumeric: {
               msg: "The field should contain a number"
           }
       }
   },
    color: {
       type: Sequelize.STRING,
       allowNull: true
   }
});

module.exports = Car;