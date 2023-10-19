const Sequelize = require('sequelize');

const Customer = require("../../model/sequelize/customers");
const Rent = require("../../model/sequelize/rent");
const Car = require("../../model/sequelize/cars");

const authUtil = require('../../util/authUtils');

exports.getCustomers = () => {
    return Customer.findAll();
};

exports.getCustomerById = (customerId) => {
    return Customer.findByPk(customerId,
        {
            include: [{
                model: Rent,
                as: 'rents',
                include: [{
                    model: Car,
                    as: 'car'
                }]
            }]
        });
};

exports.createCustomer = (newCustomerData) => {
    return Customer.create({
        name: newCustomerData.name,
        surname: newCustomerData.surname,
        address: newCustomerData.address,
        email: newCustomerData.email,
    
    });
};

exports.updateCustomer = (customerId, customerData) => {
    const name = customerData.firstName;
    const surname = customerData.lastName;
    const address = customerData.address;
    const email = customerData.email;
    return Customer.update(customerData, {where: {_id: customerId }});
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: { _id: customerId }
    });

};

exports.findByEmail = (email) => {
    return Customer.findOne({
        where: {email: email}
    });
}