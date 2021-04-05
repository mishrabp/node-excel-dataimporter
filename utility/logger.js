const config = require("config");
const log4js = require("log4js");
const logFolder = config.get('logFolder')
const logFile = logFolder + '/cheese.log'
//valid levels are ALL, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, MARK, OFF)
log4js.configure({
  appenders: { console: { type: 'console' }, cheese: { type: "file", filename: logFile } },
  categories: { default: { appenders: [ 'console', 'cheese' ], level: 'info' } }
});;

const logger = log4js.getLogger('cheese'); 

logger.trace("Entering cheese testing");

/* logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria."); */

module.exports = logger