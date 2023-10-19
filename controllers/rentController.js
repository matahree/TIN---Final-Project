const RentRepository = require('../repository/sequelize/rentRepository');
const CustomerRepository = require('../repository/sequelize/customerRepository');
const CarRepository = require('../repository/sequelize/carRepository');

exports.showRentList = (req, res, next) => {
    RentRepository.getRents()
        .then(rents => {
            res.render('pages/rent/rent-list', {
                rents: rents,
                pageTitle: req.__('rent.list.pageTitle'),
                navLocation: 'rent'
            });
        });
}

exports.showRentFormNew = (req, res, next) => {
    let allCustomers, allCars;

    RentRepository.getRents()
        .then(rents => {
            allCars = rents;
            return CustomerRepository.getCustomers();
        })
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCars();
        })
        .then(cars => {
            allCars = cars;
            res.render('pages/rent/rent-form', {
                rent: {},
                allCustomers: allCustomers,
                allCars: allCars,
                formMode: 'createNew',
                pageTitle: req.__('rent.form.add.pageTitle'),
                btnLabel: req.__('customer.form.add.btnLabel'),
                formAction: '/rent/add',
                navLocation: 'rent',
                validationErrors: []
            });
        });
}

exports.showRentFormEdit = (req, res, next) => {
    const rentId = req.params.rentId;
    let allCustomers, allCars, allRents;
    
    RentRepository.getRents()
        .then(rents => {
            allRents = rents;
            return CustomerRepository.getCustomers();
        })
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCars();
        })
        .then(cars => {
            allCars = cars;
            return RentRepository.getRentById(rentId);
        })
        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                allCustomers: allCustomers,
                allCars: allCars,
                allRents: allRents,
                formMode: 'edit',
                pageTitle: req.__('rent.form.edit.pageTitle'),
                btnLabel:  req.__('rent.form.edit.btnLabel'),
                formAction: '/rent/edit',
                navLocation: 'rent',
                validationErrors: []
            });
        });
}

exports.showRentDetails = (req, res, next) => {
    const rentId = req.params.rentId;
    let allCustomers, allCars;
    
    CustomerRepository.getCustomers()
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCars();
        })
        .then(cars => {
            allCars = cars;
            return RentRepository.getRentById(rentId)
        })
        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                allCustomers: allCustomers,
                allCars: allCars,
                formMode: 'showDetails',
                pageTitle:  req.__('rent.form.details'),
                formAction: '/rent/details',
                navLocation: 'rent',
                validationErrors: []
            });
        });     
}

exports.addRent = (req, res, next) => {
    let allCustomers, allCars, error;
    const rentData = { ...req.body };
    
    RentRepository.createRent(rentData)
        .then(result => {
            res.redirect('/rent');
        })
        .catch(err => {
            let allCustomers,allCars;
            CustomerRepository.getCustomers()
                .then(customers => {
                    allCustomers= customers;
                    return CarRepository.getCars();
        })

        .then(cars => {
            allCars = cars;
            res.render('pages/rent/rent-form', {
                rent: {},
                allCustomers: allCustomers,
                allCars: allCars,
                formMode: 'createNew',
                pageTitle:  req.__('rent.form.add.pageTitle'),
                btnLabel: req.__('rent.form.add.btnLabel'),
                formAction: '/rent/add',
                navLocation: 'rent',
                validationErrors: err.errors
            });
        });
    });
};


exports.updateRent = (req, res, next) => {
    let allCustomers, allCars, error;
    const rentId = req.body._id;
    const rentData = { ...req.body };
    
    RentRepository.updateRent(rentId, rentData)
        .then(result => {
            res.redirect('/rent');
        })
        .catch(err => {
            let allCustomers,allCars;
            CustomerRepository.getCustomers()
                .then(customers => {
                    allCustomers= customers;
                    return CarRepository.getCars()
                        .then(cars =>{
                        allCars = cars;
                        return RentRepository.getRentById(rentId);
                        })
                })
                })

        .then(rent => {
            res.render('pages/rent/rent-form', {
                rent: rent,
                allCustomers: allCustomers,
                allCars: allCars,
                formMode: 'edit',
                pageTitle: req.__('rent.form.edit.pageTitle'),
                btnLabel: req.__('rent.form.edit.btnLabel'),
                formAction: '/rent/edit',
                navLocation: 'rent',
                validationErrors: [] // error.error ya da er.error yapinca calismiyor nedense
            });
        });
};

exports.deleteRent = (req, res, next) => {
    const rentId = req.params.rentId;
    
    RentRepository.deleteRent(rentId)
        .then(() => {
            res.redirect('/rent');
        })
        .catch(err => {
            res.render('pages/rent/rent-form', {
                rent: rentData,
                pageTitle: 'Delete a rent',
                formMode: 'delete',
                btnLabel: 'Delete the rent',
                formAction: '/rent/delete',
                navLocation: 'rent',
                validationErrors: []
            })
        });
};