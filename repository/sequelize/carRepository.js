const Sequelize = require('sequelize');

const Customer = require("../../model/sequelize/customers");
const Rent = require("../../model/sequelize/rent");
const Car = require("../../model/sequelize/cars");

exports.getCars = () => {
    return Car.findAll();
};

exports.getCarById = (carId) => {
    return Car.findByPk(carId,
        {
            include: [{
                model: Rent,
                as: 'rents',
                include: [{
                    model: Customer,
                    as: 'customer'
                }]
            }]
        });
};

exports.createCar = (newCarData) => {
    return Car.create({
        carModel: newCarData.carModel,
        VIN: newCarData.VIN,
        manufactured: newCarData.manufactured,
        NumberOfCars: newCarData.NumberOfCars,
        color: newCarData.color,
        ManufacturedDate: newCarData.ManufacturedDate
    });
};

exports.updateCar = (carId, carData) => {
    const carModel = carData.carModel;
    const VIN = carData.VIN;
    const manufactured = carData.manufactured;
    const NumberOfCars = carData.NumberOfCars;
    const color = carData.color;
    const ManufacturedDate = carData.ManufacturedDate;
    return Car.update(carData, {where: {_id: carId }});
};

exports.deleteCar = (carId) => {
    return Car.destroy({
        where: { _id: carId }
    });

};