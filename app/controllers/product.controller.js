const Product = require('../models/product.model.js');

//create and save a product
exports.create = (req, res) => {
    if (!req.body.shortDescription) {
        return res.status(400).send({
            message: 'description can not be empty'
        });
    }

    const product = new Product({
        productName: req.body.productName || 'Unname product',
        shortDescription: req.body.shortDescription
    });

    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the product.'
        });
    });
};

exports.find = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'nhu o tren'
        });
    })
};

exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: 'Product not found with ID ' + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Product not found with ID' + req.params.productId
            });
        }
        return res.status(500).send({
            message: 'Error retrieving product with ID ' + req.params.productId
        });
    });
};

exports.update = (req, res) => {
    //validate request
    if (!req.body.shortDescription) {
        return res.status(400).send({
            message: 'description can not be empty'
        });
    }

    Product.findByIdAndUpdate(req.params.productId, {
        productName: req.body.productName || 'Unname product',
        shortDescription: req.body.shortDescription
    }, {new: true})
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: 'Product not found with Id' + res.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Product not found with Id ' + res.params.productId
            });
        }
        return res.status(500).send({
            message: 'Error updating product with id ' + res.params.productId
        });
    });
};
/*
The {new: true} option in the findByIdAndUpdate() method is used to return
the modified document to the then() function instead of the original.
*/

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: 'Product not found with Id' + res.params.productId
                });
            }
            res.send({message: 'Product deleted successfully !'});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                   message: 'Product not found with Id' + res.params.productId
                });
        }
            return res.status(500).send({
                message: 'Could not delete product with Id ' + res.params.productId
            });
    });
};