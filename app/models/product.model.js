const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productName: String,
    shortDescription : String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);