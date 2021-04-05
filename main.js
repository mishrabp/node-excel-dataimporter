const db = require('./models')

const sla = require('./loader/sla')
const ts = require('./loader/timesheet')

const logger = require('./utility/logger')
logger.trace("Entering cheese testing");

const folderWatcher = require('folder-watcher');
var bConnection = false; 

async function main () {
  await db.sequelize
    .authenticate()
    .then(async function(err) {
      logger.info('Connection has been established successfully.');
      bConnection = true; 
    }, function (err) {
      logger.fatal(`Unable to connect to the database: ${err}`);
    }); 

    //wathcher folder
    folderWatcher.on('./data', async (object) => {
      //handle event
      logger.info(`event : ${object.event} from ${object.file}`);
      if ((object.event === 'create' || object.event === 'change') && bConnection) {
        if (object.file === "./ESO Incident - Open - SLA Breached Listing (90 Days).xls") {
          logger.info('load SLA data..............')
          await sla(db.sequelize);
          logger.info('loading complete.')
        }
        if (object.file === "./Time_Compliance_Report.xlsx") {
          logger.info('load timesheet data..............')
          await ts(db.sequelize);
          logger.info('loading complete.')
        }
      }
    });
}

main();

