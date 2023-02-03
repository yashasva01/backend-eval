const express = require('express');
const controller = require('../controller/controller');


const router = express.Router();

router.get('/api/save', controller.getCompanySectorAndId);
router.get('/performance/:comapnyId', controller.getCompanyPerformance);


router.get('/api/companies?sector=:sector', controller.getRankedCompaniesBySector);

module.exports = router;

