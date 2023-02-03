const express = require('express');
const controller = require('../controller/controller');


const router = express.Router();

router.get('/api/save', controller.getCompanySectorAndId);


module.exports = router;

