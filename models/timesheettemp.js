'use strict';
const {
  Model
} = require('sequelize');

module.exports = async (sequelize, DataTypes) => {
  class TimeSheetTemp extends Model {
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
  TimeSheetTemp.init({
    // Model attributes are defined here
    portalId: { field: "PortalId", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    empNumber: { field: "Emp_number", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    employeeName: { field: "Employee_Name", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    fromDate: { field: "From_date", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    toDate: { field: "To_Date", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    totalTarghrs: { field: "Total_targ_hrs", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    totalRecHrs: { field: "Total_rec_hrs", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    timeOff: { field: "Time_Off", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    timeOffType: { field: "Time_Off_Type", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    attAbsType: { field: "Att_Abs_Type", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    publicHoliday: { field: "Public_Holiday", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    wbsPersResponsible: { field: "WBS_Pers_Responsible", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    wbsPersName: { field: "WBS_Pers_Name", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    wbsPersPortalid: { field: "WBS_Pers_Portalid", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    assgnmtStart: { field: "AssgnStart", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    assgnmtEnd: { field: "AssgnmtEnd", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    costCenter: { field: "Cost_Center", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    costCenterName: { field: "Costcenter_Name", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    costCenterOwner: { field: "Costcenter_Owner", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    recWbsElem: { field: "Rec_WBS_elem", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    wbsDescription: { field: "Wbs_Description", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    previousWbs: { field: "Previous_Wbs", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    processStatus: { field: "Process_status", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    processStatus1: { field: "Process_status1", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    timesheetApprpId: { field: "TimeSheet_Appr_PId", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    timesheetApprEmpId: { field: "TimeSheet_Appr_EmpId", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    dateApproved: { field: "DATE_Approved", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    timesheetApprName: { field: "TimeSheet_Appr_Name", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    premiumNumber: { field: "Premium_Number", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    premiumId: { field: "Premium_Id", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    longText: { field: "Long_Text", type: DataTypes.TEXT, allowNull: true, defaultValue: 'No Name'},
    billableNon: { field: "Billable_Non", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    nbType: { field: "NB_Type", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    onOffshore: { field: "On_Off_shore", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    ContractNo: { field: "Contract_No", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    Name: { field: "Name", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    shipToParty: { field: "Ship_to_party", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    shipToPartyname: { field: "Ship_to_party_Name", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    resourceCountry: { field: "Resource_Country", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    eeGroup: { field: "EE_group", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    eeSubGroup: { field: "EE_subgroup", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    reportingManagerId: { field: "Reporting_Manager_Id", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    reportingManagerName: { field: "Reporting_Manager_Name", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    transferredToCo: { field: "Transferred_to_CO", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    startTime: { field: "Start_Time", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    endTime: { field: "End_Time", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
    basePlus: { field: "Base_Plus", type: DataTypes.STRING, allowNull: true, defaultValue: 'No Name'},
  }, {
    sequelize,
    modelName: 'TimeSheetTemp',
    freezeTableName: true, //avoid s being added to the table name
    tableName: 'TimeSheet_Temp',
    timestamps: false // this does not add CreateAt and UpdateAt fields to the table
  });
  await TimeSheetTemp.sync({ force: false });
  // the defined model is the class itself
  console.log(TimeSheetTemp === sequelize.models.TimeSheetTemp); // true
  return TimeSheetTemp;
};