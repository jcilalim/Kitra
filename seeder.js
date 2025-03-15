const fs = require('fs');
const colors = require('@colors/colors');
const sequelize = require('./configs/db')

// Load Models
const UserModel = require('./models/user');
const TreasureModel = require('./models/Treasure');
const MoneyValueModel = require('./models/MoneyValue');

// Read JSON Files
const _users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const _moneyValues = JSON.parse(fs.readFileSync(`${__dirname}/_data/moneyValues.json`, 'utf-8'));
const _treasures  = JSON.parse(fs.readFileSync(`${__dirname}/_data/treasures.json`, 'utf-8'));


// Synchronize the model with the database
const syncTables = async () => {
    try {
        await Promise.all([
            UserModel.sync(),
            MoneyValueModel.sync(),
            TreasureModel.sync()
        ]);
      console.log(`Tables has been created...`.green.bold);
      importData();
    } catch (err) {
      console.log('Error syncing the database:', err);
    }
  };

// Add records to the table
const insertData = async (model, data, tableName) => {
    try {
       await model.bulkCreate(data);
    } catch (err) {
        console.log(`Error inserting data in ${tableName} table: ${err.message}`.red.inverse);
    }
};

// Delete the entire table
const dropTable = async (model, tableName) => {
    try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await model.drop();
    } catch (err) {
        console.log(`Error deleting ${tableName} table: ${err.message}`.red.inverse);
    }
};


// Import data into tables
const importData = async () => {
    try {
        await Promise.all([
            insertData(UserModel, _users, 'users'),
            insertData(TreasureModel, _treasures, 'treasures'),
            insertData(MoneyValueModel, _moneyValues, 'money_values'),
        ]);
        console.log(`The users, treasures, and money_value tables has been successfully seeded...`.green.bold);
        process.exit();
    } catch(err) {
        console.log(`error: ${err}`.red.inverse); 
    }
}

// Remove all tables from the database
const destroyData = async () => {
    try {
        await Promise.all([
            dropTable(UserModel, 'users'),
            dropTable(MoneyValueModel, 'money_values'),
            dropTable(TreasureModel, 'treasures'),
        ]);
        console.log(`The tables have been successfully dropped...`.yellow.bold);
        process.exit();
    } catch(err) {
        console.log(`error: ${err}`.red.inverse); 
    }
}


if (process.argv[2] == '-i') {
    syncTables();
} else if (process.argv[2] == '-d') {
    destroyData();
}