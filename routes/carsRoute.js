const express = require('express');
const router = express.Router();

const carsController = require('../controllers/carsController');

router.get('/', carsController.showCarsList);
router.get('/add', carsController.showCarsFormNew);
router.get('/edit/:carId', carsController.showCarsFormEdit);
router.get('/details/:carId', carsController.showCarsDetails);

router.post('/add', carsController.addCar); 
router.post('/edit', carsController.updateCar);
router.get('/delete/:carId', carsController.deleteCar);

module.exports = router;