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
  quantityDose: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  inmunityDate: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
}, {
  // Other model options go here
});

Vaccine.sync({alter:true})

module.exports = Vaccine