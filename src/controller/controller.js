
const services = require('../services/companyServices');


const getCompanySectorAndId = async (req, res) => {
    const {status, data} = services.getCompanyScore();
    res.status(status).send(data)
}

const getCompanyPerformance = async (req, res) => {
    const comapnyId = req.params;
    const {status, data} = services.getCompanyPerformanceService(comapnyId);
    res.status(status).send(data);
};

const getRankedCompaniesBySector = async (req, res) => {
    res.send('comming soon');
}

module.exports = {}
module.exports.getCompanySectorAndId = getCompanySectorAndId;
module.exports.getCompanyPerformance = getCompanyPerformance;
module.exports.getRankedCompaniesBySector = getRankedCompaniesBySector