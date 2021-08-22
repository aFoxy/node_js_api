const { db } = require("../config/db");
const { carValidation } = require("../utils/validation");

const baseRef = 'cars/';

exports.getAllCars = (req, res) => {
    let cars = [];
    db.ref(baseRef).once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            cars.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
    })
        .then(() => res.status(200).send(cars))
        .catch(reason => res.status(500).send(reason));
};

exports.getCarById = (req, res) => {
    db.ref(baseRef + req.params.id).once('value')
        .then((a) => {
            if (!a.val()) {
                res.status(404).send("Item not found");
                return;
            }
            console.log('getById', req.params.id, a.val())
            res.status(200).send({ id: a.key, ...a.val() })
        }).catch(reason => res.status(500).send(reason));
}

exports.createCar = (req, res) => {
    const errors = carValidation(req.body);
    if (errors.length) {
        return res.status(400).send(errors[0].message);
    }
    try {
        const id = db.ref(baseRef).push(req.body).key;
        db.ref(baseRef + id).on("value", (a => {
            return res.status(200).send({ id: id, ...a.val() });
        }))
    } catch (error) {
        res.status(500).send(error);
    }

};

exports.modifyCar = (req, res) => {
    const errors = carValidation(req.body);
    if (errors.length) {
        res.status(400).send(errors[0].message);
        return;
    }
    db.ref(baseRef + req.params.id).update(req.body)
        .then(() => {
            db.ref(baseRef + req.params.id).on("value", (a => {
                res.status(200).send({ id: req.params.id, ...a.val() });
            }))
        }).catch(reason => res.status(500).send(reason));
}

exports.deleteCar = (req, res) => {
    db.ref(baseRef + req.params.id).remove()
        .then(() => {
            res.sendStatus(200);
        }).catch(reason => res.status(500).send(reason));
};
