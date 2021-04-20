const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../core/database')();

const Patientdata = sequelize.define('Patientdata', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  HealthCardID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  PhotoURL: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  DateOfBird: {
    type: DataTypes.STRING,
    allowNull: false
  },
  VaccineId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantityDose: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  doseNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  inmunityDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vaccinationDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  LotNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nonceNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  // Other model options go here
});

Patientdata.sync({alter:true})

module.exports = Patientdata