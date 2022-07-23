const express= require('express');
const { getAllProducts, createProduct, upadteProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/authentication');

const router= express.Router();


// create route 
router.route('/products').get( getAllProducts)
router.route('/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),createProduct)
router.route('/products/:id').put(isAuthenticatedUser,authorizeRoles('admin'),upadteProduct)
router.route('/products/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct).get(getProductDetails)


module.exports= router