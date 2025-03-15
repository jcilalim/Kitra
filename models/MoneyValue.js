const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const Treasure = require('./Treasure');

const MoneyValue = sequelize.define('MoneyValue', {
  treasure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: Treasure,  
          key: 'Id',       
        },
      onDelete: 'CASCADE'
    },
    amt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
},{
    tableName: 'money_values',
    timestamps: true,
});

module.exports = MoneyValue;
