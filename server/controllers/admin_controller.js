const User = require('../models/user');
const Product = require('../models/product');

module.exports = {
    getAdminUsers(req,res){
        User.find().exec((err,users) => {   //why not find empty object like in  products_controller?
            if (err) console.log('Find all admin users error-------',err);
            console.log('All admin users---------',users);
            res.status(200).json({users});
        });
    },

    createProduct(req,res){
        const {name, description, price} = req.body;
        //Have a new Product model instance assigned to a variable to be save to database.
        let newProduct = new Product({
            name,
            description,
            price
        });
        newProduct.save(); //save method on Product from mongoose
        res.status(200).json({product:newProduct}) //send back the products
    },
    
    updateProduct(req,res){
        const {id} = req.params;
        const {name, description, price} = req.body;
        Product.findById(id).exec((err,product) => {
            if (err) console.log('Update product error------',err);
            product.name=name;
            product.description=description;
            product.price=price;
            product.save();
            res.status(200).json({product});
        });
    },

    deleteProduct(req,res) {
        const {id} = req.params;
        Product.deleteOne({_id:id}).exec((err,product) => {
            if (err) console.log('Delete product error------',err);
            res.status(200).json({product})
        })
    }
};