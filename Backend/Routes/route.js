const express = require('express');
const router = express.Router();

const {adminLogin,requestPasswordReset} = require('../Controllers/UserController');
const {auth, isUser, isAdmin} = require('../Middlewares/authMiddleware');
const {createState, getStates, updateState, deleteState} = require('../Controllers/StateController');
const {createCity, getCities, updateCity, deleteCity } = require('../Controllers/CityController');
const {createWarehouse, getWarehouses, updateWarehouse, deleteWarehouse} = require('../Controllers/WarehouseController');



// Admin Login
router.post('/login/admin', adminLogin);
// Request Password Reset
router.post('/admin/reset-password', requestPasswordReset);


// Protected route for User
router.get('/user', auth, isUser, (req,res) => {
    return res.status(200).json({
        success:true,
        msg:"Welcome to the User protected route."
    })
}) 

// Protected route for Admin
router.get('/admin', auth, isAdmin, (req,res) => {
    return res.status(201).json({
        success:true,
        msg:"Welcome to the admin protected route."
    })
})


// State Routes
router.post('/admin/state/createState', createState);
router.get('/admin/state/fetchStates', getStates);
router.put('/admin/state/updateState/:id', updateState);
router.delete('/admin/state/deleteState/:id', deleteState);

// City Routes
router.post('/admin/city/createCity', createCity);
router.get('/admin/city/fetchCities', getCities);
router.put('/admin/city/updateCity/:id', updateCity);
router.delete('/admin/city/deleteCity/:id', deleteCity);

// Warehouse Routes
router.post('/admin/warehouse/createWarehouse', createWarehouse);
router.get('/admin/warehouse/getWarehouses', getWarehouses);
router.put('/admin/warehouse/updateWarehouse/:id', updateWarehouse);
router.delete('/admin/warehouse/deleteWarehouse/:id', deleteWarehouse);

module.exports = router;