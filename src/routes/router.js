const express = require('express');
const controller = require('../controller/controller');


const router = express.Router();

router.get('/api/save', controller.getCompanySectorAndId);
router.get('/performance/:comapnyId', controller.getCompanyPerformance);

router.post('/:companyId/:name', controller.changeCompanyName);

router.get('/api/companies', controller.getRankedCompaniesBySector);

module.exports = router;
