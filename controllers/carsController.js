const CarRepository = require('../repository/sequelize/carRepository');

exports.showCarsList = (req, res, next) => {
    CarRepository.getCars()
        .then(cars => {
            res.render('pages/cars/cars-list', {
                cars: cars,
                navLocation: 'cars',
                pageTitle: req.__('car.list.pageTitle'),
            });
        });
}

exports.showCarsFormNew = (req, res, next) => {
    res.render('pages/cars/cars-form', {
        car: {},
        pageTitle: req.__('car.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('car.form.add.btnLabel'),
        formAction: '/cars/add',
        navLocation: 'cars',
        validationErrors: []
    });
}

exports.showCarsFormEdit = (req, res, next) => {
    const carId = req.params.carId;
    
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/cars/cars-form', {
                car: car,
                formMode: 'edit',
                pageTitle: req.__('car.form.edit.pageTitle'),
                btnLabel: req.__('car.form.edit.btnLabel'),
                formAction: '/cars/edit',
                navLocation: 'cars',
                validationErrors: []
            });
        });
}

exports.showCarsDetails = (req, res, next) => {
    const carId = req.params.carId;
    
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/cars/cars-form', {
                car: car,
                formMode: 'showDetails',
                pageTitle: req.__('car.form.details'),
                formAction: '',
                navLocation: 'cars',
                validationErrors: []
            });
        });
}

exports.addCar = (req, res, next) => {
    const carData = { ...req.body };
    
    CarRepository.createCar(carData)
        .then( result => {
            res.redirect('/cars');
        })
        .catch(err => {
            res.render('pages/cars/cars-form', {
                car: carData,
                formMode: 'createNew',
                pageTitle: req.__('car.form.add.pageTitle'),
                btnLabel:  req.__('car.form.add.btnLabel'),
                formAction: '/cars/add',
                navLocation: 'cars',
                validationErrors: err.errors
            })
        });
};

exports.updateCar = (req, res, next) => {
    const carId = req.body._id;
    const carData = { ...req.body };
    let error;
    
    CarRepository.updateCar(carId, carData)
        .then(result => {
            res.redirect('/cars');
        })
        .catch(err => {
            error = err;
            return CarRepository.getCarById(carId)
        })
        .then(car => {
            res.render('pages/cars/cars-form', {
                car: car,
                formMode: 'edit',
                pageTitle: req.__('car.form.edit.pageTitle'),
                btnLabel:  req.__('car.form.edit.btnLabel'),
                formAction: '/cars/edit',
                navLocation: 'cars',
                validationErrors: []
            })
        });
};

exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId;
    const carData = { ...req.body };
    
    CarRepository.deleteCar(carId)
        .then( () => {
            res.redirect('/cars');
        })
        .catch(err => {
            res.render('pages/cars/cars-form', {
                car: carData,
                formMode: 'delete',
                pageTitle: 'Deleting a car',
                btnLabel: 'Delete the car',
                formAction: '/cars/delete',
                navLocation: 'cars',
                validationErrors: []
            })
        });
};