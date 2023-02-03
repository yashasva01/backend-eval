const axios = require('axios');
const services = require('../services/companyServices');
const CSV = require('csv-string');
const db = require('../models');

const getCompanySectorAndId = async (req, res) => {
    
    const url = 'https://store-0001.s3.amazonaws.com/input.csv';
    let resp = await axios.get(url);
    let responseData = resp.data;

    let parsedCsv = CSV.parse(responseData);
    let length = parsedCsv.length;
    let companyDetailsById = [];
    let sectorVisited = [];
    let companyDetailsBySector = [];
    for(let i = 1; i < length; i++) {
        const companyIdUrl = `http://54.167.46.10/company/${parsedCsv[i][0]}`;
        const resById = await axios.get(companyIdUrl);
        companyDetailsById.push({id: resById.data.id, name: resById.data.name, ceoName: resById.data.ceo});
    }

    for(let i = 1; i < length; i++) {
        if(sectorVisited.includes(parsedCsv[i][1])) {
                continue;
        }else {
            const companySectorUrl = `http://54.167.46.10/sector?name=${parsedCsv[i][1]}`;
            const resBySector = await axios.get(companySectorUrl);
            let resLenght = resBySector.data.length;
            for(let j = 0; j < resLenght; j++) {
                
                const len = resBySector.data[j].performanceIndex.length;
                    let cpiVal = 0;
                    let cfVal = 0;
                    let mauVal = 0;
                    let roicVal = 0;
                for(let k = 0; k < len; k++) {
                    if(k === 0){
                        cpiVal = resBySector.data[j].performanceIndex[k].value;
                    }else if(k === 1){
                        cfVal = resBySector.data[j].performanceIndex[k].value;
                    }else if(k === 2){
                        mauVal = resBySector.data[j].performanceIndex[k].value;
                    }else {
                        roicVal = resBySector.data[j].performanceIndex[k].value;
                    }
                }
                const obj = {
                    sector: parsedCsv[i][1],
                    id: resBySector.data[j].companyId,
                    cpi: cpiVal,
                    cf: cfVal,
                    mau: mauVal,
                    roic: roicVal
                }
                companyDetailsBySector.push(obj);
            }
            sectorVisited.push(parsedCsv[i][1]);
        }
    }
    const responePushCompanyDetailsById = await db.companyInfo.bulkCreate(companyDetailsById);
    const responePushCompanyDetailsBySector = await db.companyPerformace.bulkCreate(companyDetailsBySector);
}


const getCompanyDetails = async (req, res) => {
    const reqObj = req.body;
    console.log(reqObj);
};

module.exports = {}
module.exports.getCompanySectorAndId = getCompanySectorAndId;
module.exports.getCompanyDetails = getCompanyDetails;

