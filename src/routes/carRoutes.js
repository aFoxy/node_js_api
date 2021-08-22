const express = require('express');
const { verify } = require("../middleware/middleware");
const controller = require('./../controllers/carController')
const router = express.Router();

router.get('/', verify, controller.getAllCars);
router.get('/:id', verify, controller.getCarById);
router.post('/', verify, controller.createCar);
router.patch('/:id', verify, controller.modifyCar);
router.delete('/:id', verify, controller.deleteCar);

module.exports = router;
