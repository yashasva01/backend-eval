'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companyPerformace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.companyInfo, {
        foreignKey: 'CompanyId',
        targetKey: 'id'
      });
    }
  }
  companyPerformace.init({
    sector: DataTypes.STRING,
    companyId: DataTypes.STRING,
    cpi: DataTypes.FLOAT,
    cf: DataTypes.FLOAT,
    mau: DataTypes.FLOAT,
    roic: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'companyPerformace',
  });
  return companyPerformace;
};