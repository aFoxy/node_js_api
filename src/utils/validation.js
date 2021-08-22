const Validator = require('fastest-validator');
const v = new Validator();

const carSchema = {
    brand: { type: "string", min: 1, max: 50  },
    model: { type: "string" },
    yearOfManufacturing: { type: "number", positive: true, integer: true },
    maxSpeed: { type: "number" },
    fuelConsumption: { type: "number" }
}

const userSchema = {
email: { type: "string"},
password: { type: "string"}
}

exports.carValidation = v.compile(carSchema);

exports.authValidation = v.compile(userSchema);
