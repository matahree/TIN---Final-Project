const customerRepository = require('../repository/sequelize/customerRepository');
const authUtil = require("../util/authUtils");

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    customerRepository.findByEmail(email)
        .then(customer => {
            if(!customer) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Invalid email address or password",
                    message: 'Incorrect email address or password'
                })
            } else if(authUtil.comparePasswords(password, customer.password) === true)  {
                req.session.loggedUser = customer;
                console.log('customer logged', customer);
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Invalid email address or password",
                    message: 'Incorrect email address or password'
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}
