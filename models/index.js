const { Sequelize } = require('sequelize');
const sequelize = require('../configs/db');
const MoneyValue = require('./MoneyValue');
const Treasure = require('./Treasure');

// A Treasure can have many MoneyValues
Treasure.hasMany(MoneyValue, {
    foreignKey: 'treasure_id',
    sourceKey: 'Id',
    onDelete: 'CASCADE',
});

// A MoneyValue belongs to a Treasure
MoneyValue.belongsTo(Treasure, {
    foreignKey: 'treasure_id',
    targetKey: 'Id',
});

module.exports = { sequelize, MoneyValue, Treasure };
