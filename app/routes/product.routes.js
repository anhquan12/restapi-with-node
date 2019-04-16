module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    //create a new product
    app.post('/products', products.create);

    //retrieve all products
    app.get('/products', products.find);

    app.get('/products/:productId', products.findOne);

    //update a product
    app.put('/products/:productId', products.update);

    //delete a product
    app.delete('/products/:productId', products.delete)
}