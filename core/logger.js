
/** Captains Log
 * @param {Object} overrides
 *      , {Object}  custom         : a custom logger to use, i.e. Winston
 *      , {Object}  logLevels      : optional - named log levels, defaults to npm conventions
 *      , {String}  level          : the current log level- e.g. silly, verbose, info, debug, warn, error, or silent
 *      , {Boolean} inspect        : defaults to true-- whether to make the log output more readable (combines all args into one string)
 *      , {Object}  inspectOptions : defaults to {}-- options to pass to the inspect function. One example can be {colors: true, depth:null}
 *                                   printing objects in colors. See: https://nodejs.org/api/util.html#util_util_inspect_object_options
 * @return {Function{}} enhanced (callable) version of logger
 */
const logger = require('captains-log')({
  inspectOptions: {
    colors: true,
    depth: null,
  }
});

logger.express = function(req, res, next) {
  //logger(Object.keys(req));
  const timedate = new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '');     // delete the dot and everything after
  logger.info(timedate, req.ip, req.method, req.url, JSON.stringify(req.params));
  next();
};

logger("LOGGER initialized");
// it's important join to process in here
process.logger = logger;
