const Product = require('../models/product') //has to be ouside of module.exports to be global variable

module.exports = {
    readAllProducts(req, res) {
        Product.find({}).exec((err, products) => { //empty object to return all products
            if (err) console.log('Get all products Mongoose error --------', err);
            //When using mongoose can use a callback or a use a exec method to catch and respond to errors.
            console.log('products----------',products);
            //After the data is received send a status code of 200 and the data via the send method.
            res.status(200).send(products);
            //this can also be used as response: res.status(200).json({products})
        });
    },
    readProduct(req, res) {
        //Destruct the id from req.params - we get it from the endpoint
        const { id } = req.params;
        Product.findById({id}).exec((err, product) => {
            if (err) console.log('Get single product error -------', err);
            console.log('product--------', product);
            res.status(200).json({product});
        });
    }

};