const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Treasure = sequelize.define('Treasure', {
  Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    }
},{
    tableName: 'treasures',
    timestamps: true,
});

module.exports = Treasure;
