'use strict';
const {
  Model
} = require('sequelize');

module.exports = async (sequelize, DataTypes) => {
  class SLA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* static associate(models) {
      // define association here
      this.hasMany(models.Listing);
    } */
  };
  SLA.init({
    // Model attributes are defined here
    task: {
      field: "Task",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
    description: {
      field: "Short description",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
    name: {
      field: "Name",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
    name1: {
      field: "Name_1",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
    state: {
      field: "State",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
    definition: {
      field: "SLA definition",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
    stage: {
      field: "Stage",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
    actualTime: {
      field: "Actual time left",
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
    actualPercentage: {
      field: "Actual elapsed percentage",
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
    startTime: {
      field: "Start time",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
    stopTime: {
      field: "Stop time",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'No Name'
      // unique: true
    },
  }, {
    sequelize,
    modelName: 'SLA',
    freezeTableName: true, //avoid s being added to the table name
    tableName: 'SN_SLA_Incident',
    timestamps: false // this add CreateAt and UpdateAt fields to the table
  });
  await SLA.sync({ force: false });
  // the defined model is the class itself
  console.log(SLA === sequelize.models.SLA); // true
  return SLA;
};