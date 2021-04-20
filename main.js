const db = require('./models') 

const sla = require('./loader/sla')
const ts = require('./loader/timesheet')

const Fs = require('fs')  
const Path = require('path')

const logger = require('./utility/logger')
logger.trace("Entering cheese testing");

var bConnection = false; 
var time = 60000;

(async() => {
  await db.sequelize
  .authenticate()
  .then(async function(err) {
    logger.info('Connection has been established successfully.');
    bConnection = true; 
  }, function (err) {
    logger.fatal(`Unable to connect to the database: ${err}`);
  }); 
})();

var bRunning = false
setInterval(async ()=> {
  //time = 60000
  if (!bRunning && bConnection) {
    logger.info('Importer wakes u................');
    bRunning = true 
    if(Fs.existsSync(Path.join("./data", "ESO Incident - Open - SLA Breached Listing (90 Days).xls"))){
      logger.info('load SLA data..............')
      await sla(db.sequelize);
      logger.info('loading complete.')
    }
    if(Fs.existsSync(Path.join("./data", "Time_Compliance_Report.xls"))){
      logger.info('load timesheet data..............')
      await ts(db.sequelize);
      logger.info('loading complete.')
    }
    bRunning = false
    logger.info('Importer going to sleep..........')
  }
  else {
    logger.warn('a job is already in progress. or db connection is not established')
  }
}, time)

