'use strict';
const config = require("config");
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
//const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/default.json');
const db = {};

let sequelize = new Sequelize(config.get('sqlDBName'), config.get('sqlUserId'), (new Buffer(config.get('sqlPassword'), 'base64')).toString('ascii'), {
  dialect: 'mssql',
  host: config.get('sqlServerName'),
  port: config.get('sqlPort'), // Default port
  logging: false,
  "dialectOptions": {
      options: { "requestTimeout": 300000, "connectTimeout": 60000 }
  },
  "pool": {
      max: 50,
      min: 5,
      idle: 10000,
      acquire: 100000,
      options: {"enableArithAbort": true, "max": 50, "min": 5, "idle": 10000, "acquire": 100000}
  }
})


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
