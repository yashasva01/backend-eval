const CSV = require('csv-string');
const db = require('../models');
const axios = require('axios');


const getCompanyScore = async () => {
    const url = 'https://store-0001.s3.amazonaws.com/input.csv';
    let resp = await axios.get(url);
    let responseData = resp.data;

    let parsedCsv = CSV.parse(responseData);
    let length = parsedCsv.length;
    let companyDetailsById = [];
    let sectorVisited = [];
    let companyDetailsBySector = [];

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
                    companyId: resBySector.data[j].companyId,
                    cpi: parseFloat(cpiVal),
                    cf: parseFloat(cfVal),
                    mau: parseFloat(mauVal),
                    roic: parseFloat(roicVal)
                }
                companyDetailsBySector.push(obj);
                //await db.companyPerformace.create(obj);
            }
            sectorVisited.push(parsedCsv[i][1]);
        }
    }
    for(let i = 1; i < length; i++) {
        const companyIdUrl = `http://54.167.46.10/company/${parsedCsv[i][0]}`;
        const resById = await axios.get(companyIdUrl);
        companyDetailsById.push({id: resById.data.id, name: resById.data.name, ceoName: resById.data.ceo});
    }
    //const responePushCompanyDetailsById = await db.companyInfo.bulkCreate(companyDetailsById);

    const lenOfCompanies = companyDetailsById.length;
    const companyScore = [];
    for(let i = 0; i < lenOfCompanies; i++) {
        const id = companyDetailsById[i].id;
        const detailOfComapny = await db.companyPerformace.findOne({ where: {companyId: id} });
        const ceoName = companyDetailsById[i].ceoName;
        const address = companyDetailsById[i].address;
        let score = ((detailOfComapny.cpi * 10) + (detailOfComapny.cf / 10000) + (detailOfComapny.mau * 10) + detailOfComapny.roic) / 4
        //console.log(score);
        const obj = {
            sector: detailOfComapny.sector,
            companyId: id,
            ceoName: ceoName,
            address: address,
            score: parseFloat(score),
            name: companyDetailsById[i].name
        }
        companyScore.push(obj);
    const companySS = await db.companyScore.create(obj);

    return {status: 200, data: companySS};
    // console.log(companyDetailsBySector)
    }
}

const getCompanyPerformanceService = async (companyId) => {
    const companyDetail = await db.companyPerformace.findOne({ where: {companyId: companyId} });
    return {status: 200, data: companyDetail};
}

const changeCompanyNameService = async (companyId, name) => {
    if (!companyId || !name) {
        return {status: 400, data: 'Bad Request'};
    }

    const isPresent = await db.companyInfo.findOne({where: {id: taskId}});
    if(!isPresent){
        return {status: 400, data: 'Company not found'};
    }
        await db.tasks.update(obj, {name : name},{where: {id: companyId}});
        const updatedTask = await db.tasks.findOne({where: {id: taskId}});
        return {status: 200, data: updatedTask};
}
module.exports = {}
module.exports.getCompanyScore = getCompanyScore;
module.exports.getCompanyPerformanceService = getCompanyPerformanceService;