//https://www.youtube.com/watch?v=1XUJgdFRK2M
const config = require("config");
const xlsx = require('xlsx')
const logger = require('../utility/logger')
const movefile = require('../utility/movefile')
//const sql = require('../models/adhocsql')

const sourceDir = config.get('dataFolder')
const archiveDir = config.get('archiveFolder')
const fileName = sourceDir + "/ESO Incident - Open - SLA Breached Listing (90 Days).xls"

function addLeadingZeros(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n
}
const formatDate = (dt) => {
  return dt.getFullYear() + "-" + addLeadingZeros(dt.getMonth() + 1) + "-" + addLeadingZeros(dt.getDate()) + " " + addLeadingZeros(dt.getHours()) + ":" + addLeadingZeros(dt.getMinutes()) + ":" + addLeadingZeros(dt.getSeconds())
}

module.exports = async function (sequelize) {
  const wb = xlsx.readFile(fileName, {cellDates: true})
  const ws = wb.Sheets["Page 1"]
  const data = xlsx.utils.sheet_to_json(ws)
  
  //map the excel data to model object
  const mappedData = data.map(item => {
    const container = {};
    container.task = item["Task"];;
    container.description = item["Short description"];
    container.name = item["Name"];
    container.name1 = item["Name_1"];
    container.state = item["State"];
    container.definition = item["SLA definition"];
    container.stage = item["Stage"];
    container.actualTime = item["Actual time left"];
    container.startTime = formatDate(item["Start time"]); //item["Start time"].format('YYYY-MM-DD HH:m:s');
    container.stopTime = formatDate(item["Stop time"]); //.toLocaleString();
    container.actualPercentage = item["Actual elapsed percentage"];

    return container;
  })

  //console.log(mappedData[0])
  await sequelize.models.SLATemp.destroy({
    truncate: true
  });


  sequelize.models.SLATemp.bulkCreate(mappedData)
    .then(async (records) => {
      logger.info('No of records inserted into [SN_SLA_Incident_Temp]: ' + records.length)
      await sequelize.query(`DELETE FROM [dbo].[SN_SLA_Incident]  WHERE TASK IN (SELECT TASK FROM [dbo].[SN_SLA_Incident_TEMP])`)
    })
    .then(async (result, metdata)=>{
      logger.info('No of records deleted: ' + result)
      console.dir(result)
      logger.info('Matching records deleted from [SN_SLA_Incident]')
      await sequelize.query(`INSERT INTO [dbo].[SN_SLA_Incident] ([Task],[Short description],[Name],[Name_1],[State],[SLA definition],[Stage],[Actual time left],[Actual elapsed percentage],[Start time],[Stop time]) SELECT [Task],[Short description],[Name],[Name_1],[State],[SLA definition],[Stage],[Actual time left],[Actual elapsed percentage],[Start time],[Stop time] FROM [dbo].[SN_SLA_Incident_TEMP]`)
    })
    .then(async (result, metdata)=>{
      logger.info('No of records inserted: ' + result)
      logger.info('Missing records inserted into [SN_SLA_Incident]')
      await movefile (fileName, archiveDir)
    })
    .then(()=>{
      logger.info("Data file archieved.")
    })
    .catch((err)=>{
      logger.info(err)
    });
  

 /* await sql(`DELETE FROM [dbo].[SN_SLA_Incident]  WHERE TASK IN (SELECT TASK FROM [dbo].[SN_SLA_Incident_TEMP])`)

  await sql(`INSERT INTO [dbo].[SN_SLA_Incident] ([Task],[Short description],[Name],[Name_1],[State],[SLA definition],[Stage],[Actual time left],[Actual elapsed percentage],[Start time],[Stop time]) SELECT [Task],[Short description],[Name],[Name_1],[State],[SLA definition],[Stage],[Actual time left],[Actual elapsed percentage],[Start time],[Stop time] FROM [dbo].[SN_SLA_Incident_TEMP]`)

  await movefile (fileName, archiveDir)*/
};



