//https://www.youtube.com/watch?v=1XUJgdFRK2M
const config = require("config");
const xlsx = require('xlsx')
const logger = require('../utility/logger')
const movefile = require('../utility/movefile')
//const sql = require('../models/adhocsql')

const sourceDir = config.get('dataFolder')
const archiveDir = config.get('archiveFolder')
const fileName = sourceDir + "/Time_Compliance_Report.xls"

module.exports = async function (sequelize) {
  const wb = xlsx.readFile(fileName, {cellDates: true})
  const ws = wb.Sheets["Time_Compliance_Report"]
  const data = xlsx.utils.sheet_to_json(ws,{raw: true, defval:null})
  
  //map the excel data to model object
  const mappedData = data.map(item => {
    const container = {};
    container.portalId = item["PortalId"];
    container.empNumber = item["Emp number"];
    container.employeeName = item["Employee Name"];
    container.fromDate = item["From date"];
    container.toDate = item["To Date"];
    container.totalTarghrs = item["Total targ.hrs"];
    container.totalRecHrs = item["Total rec.hrs"];
    container.timeOff = item["Time Off"];
    container.timeOffType = item["Time Off Type"];
    container.attAbsType = item["Att./Abs Type"];
    container.publicHoliday = item["Public Holiday"];
    container.wbsPersResponsible = item["WBS Pers.Responsible"];
    container.wbsPersName = item["WBS Pers.Name"];
    container.wbsPersPortalid = item["WBS Pers.Portalid"];
    container.assgnmtStart = item["AssgnStart"];
    container.assgnmtEnd = item["AssgnmtEnd"];
    container.costCenter = item["Cost Center"];
    container.costCenterName = item["Costcenter Name"];
    container.costCenterOwner = item["Costcenter Owner"];
    container.recWbsElem = item["Rec. WBS elem."];
    container.wbsDescription = item["Wbs Description"];
    container.previousWbs = item["Previous Wbs"];
    container.processStatus = item["Process status"];
    container.processStatus = item["Process status"];
    container.timesheetApprpId = item["TimeSheet Appr PId"];
    container.timesheetApprEmpId = item["TimeSheet Appr EmpId"];
    container.dateApproved = item["DATE Approved"];
    container.timesheetApprName = item["TimeSheet Appr Name"];
    container.premiumNumber = item["Premium Number"];
    container.premiumId = item["Premium Id"];
    container.longText = item["Long Text"];
    container.billableNon = item["Billable/Non"];
    container.nbType = item["NB Type"];
    container.onOffshore = item["On/Off shore"];
    container.ContractNo = item["Contract No"];
    container.Name = item["Name"];
    container.shipToParty = item["Ship-to-party"];
    container.shipToPartyname = item["Ship-to-party Name"];
    container.resourceCountry = item["Resource Country"];
    container.eeGroup = item["EE group"];
    container.eeSubGroup = item["EE subgroup"];
    container.reportingManagerId = item["Reporting Manager Id"];
    container.reportingManagerName = item["Reporting Manager Name"];
    container.transferredToCo = item["Transferred to CO"];
    container.startTime = item["Start Time"];
    container.endTime = item["End Time"];
    container.basePlus = item["Base Plus"];


    return container;
  })
  
  //console.log(mappedData[0])
  await sequelize.models.TimeSheetTemp.destroy({
    truncate: true
  });

  
  var i=0;
  await mappedData.map((item) => {
    try {
      sequelize.models.TimeSheetTemp.create(item)
      i++
    } catch{}
  });

  
  await sequelize.query('DELETE FROM [dbo].[TimeSheet] WHERE ID in (SELECT B.ID FROM [dbo].[TimeSheet_Temp] A JOIN [dbo].[TimeSheet] B ON A.PortalId=B.PortalId and A.From_date=B.From_date)');

  await sequelize.query('INSERT INTO [dbo].[TimeSheet] ( [PortalId],[Emp_number],[Employee_Name],[From_date],[To_Date],[Total_targ_hrs],[Total_rec_hrs],[Time_Off],[Time_Off_Type],[Att_Abs_Type],[Public_Holiday],[WBS_Pers_Responsible],[WBS_Pers_Name],[WBS_Pers_Portalid],[AssgnStart],[AssgnmtEnd],[Cost_Center],[Costcenter_Name],[Costcenter_Owner],[Rec_WBS_elem],[Wbs_Description],[Previous_Wbs],[Process_status],[Process_status1],[TimeSheet_Appr_PId],[TimeSheet_Appr_EmpId],[DATE_Approved],[TimeSheet_Appr_Name],[Premium_Number],[Premium_Id],[Long_Text],[Billable_Non],[NB_Type],[On_Off_shore],[Contract_No],[Name],[Ship_to_party],[Ship_to_party_Name],[Resource_Country],[EE_group],[EE_subgroup],[Reporting_Manager_Id],[Reporting_Manager_Name],[Transferred_to_CO],[Start_Time],[End_Time],[Base_Plus]) SELECT [PortalId],[Emp_number],[Employee_Name],[From_date],[To_Date],[Total_targ_hrs],[Total_rec_hrs],[Time_Off],[Time_Off_Type],[Att_Abs_Type],[Public_Holiday],[WBS_Pers_Responsible],[WBS_Pers_Name],[WBS_Pers_Portalid],[AssgnStart],[AssgnmtEnd],[Cost_Center],[Costcenter_Name],[Costcenter_Owner],[Rec_WBS_elem],[Wbs_Description],[Previous_Wbs],[Process_status],[Process_status1],[TimeSheet_Appr_PId],[TimeSheet_Appr_EmpId],[DATE_Approved],[TimeSheet_Appr_Name],[Premium_Number],[Premium_Id],[Long_Text],[Billable_Non],[NB_Type],[On_Off_shore],[Contract_No],[Name],[Ship_to_party],[Ship_to_party_Name],[Resource_Country],[EE_group],[EE_subgroup],[Reporting_Manager_Id],[Reporting_Manager_Name],[Transferred_to_CO],[Start_Time],[End_Time],[Base_Plus] FROM [dbo].[TimeSheet_Temp]')

  await movefile (fileName, archiveDir)

  logger.info('No of records inserted: ' + i++)
}

