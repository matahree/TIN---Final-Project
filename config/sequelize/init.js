const sequelize = require('./sequelize');

const Customer = require('../../model/sequelize/customers');
const Car = require('../../model/sequelize/cars');
const Rent = require('../../model/sequelize/rent');

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Customer.hasMany(Rent, { as: 'rents', foreignKey: { name: 'customer_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Rent.belongsTo(Customer, { as: 'customer', foreignKey: { name: 'customer_id', allowNull: false } });
    Car.hasMany(Rent, { as: 'rents', foreignKey: { name: 'car_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Rent.belongsTo(Car, { as: 'car', foreignKey: { name: 'car_id', allowNull: false } });

    let allCustomers, allCars;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Customer.findAll();
        })
        .then(customers => {
            if (!customers || customers.length == 0) {
                return Customer.bulkCreate([
                    { name: 'Brad', surname: 'Pitt', address: 'Address1',  email: 'example@domain.com', password: passHash },
                    { name: 'Angelina', surname: 'Jolie', address: 'Address2',  email: 'example2@domain.com', password: passHash }
                ])
                    .then(() => {
                        return Customer.findAll();
                    });
            } else {
                return customers;
            }
        })
        .then(customers => {
            allCustomers = customers;
            return Car.findAll();
        })
        .then(cars => {
            if (!cars || cars.length == 0) {
                return Car.bulkCreate([
                    { carModel: 'Renault Captur', VIN: '1GBJG31U561151054', manufactured: 'French automaker Renault', NumberOfCars: '10', color: 'blue' },
                    { carModel: 'Audi A3', VIN: 'JN8AZ2NE0C9087641', manufactured: 'Audi AG', NumberOfCars: '15', color: 'black' }
                ])
                    .then(() => {
                        return Customer.findAll();  // CHECK THIS PART ONE MORE TIME  cars/customer
                    });
            } else {
                return cars;
            }
        })
        .then(cars => {
            allCars = cars;
            return Rent.findAll();
        })
        .then(rents => {
            if (!rents || rents.length == 0) {
                return Rent.bulkCreate([
                    { customer_id: allCustomers[0]._id, car_id: allCars[0]._id, address: 'address1', rentalDate: '01.01.2019', returnDate: '05.02.2019' },
                    { customer_id: allCustomers[1]._id, car_id: allCars[1]._id, address: 'address2', rentalDate: '01.01.2020', returnDate: '05.02.2020' }
                ]);
            } else {
                return rents;

            }
        });
};