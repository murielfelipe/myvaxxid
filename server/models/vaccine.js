const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../core/database')();

const Vaccine = sequelize.define('Vaccine', {
  // Model attributes are defined here
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lotNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantityDose: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateInmunity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  // Other model options go here
});

Vaccine.sync()

module.exports = Vaccine