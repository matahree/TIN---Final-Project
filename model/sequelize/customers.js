const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Customer = sequelize.define('Customers', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
   name: {
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
   surname: {
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
   address: {
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

    password:{
       type: Sequelize.STRING,
        allowNull: false
    },

   email: {
       type: Sequelize.STRING,
       allowNull: true,
       unique: true,
       validate: {
           isEmail: {
               msg: "The field should contain a valid email address in accordance with the pattern"
           },
       }
   },
});

module.exports = Customer;