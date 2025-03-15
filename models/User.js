const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,      
        allowNull: false,
        autoIncrement: true, 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
},{
    tableName: 'users',
    timestamps: true,
});

module.exports = User;