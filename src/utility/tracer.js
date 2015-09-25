var fs = require('fs');
var config = require('./config').tracer.settings;
var s = 0;

exports.logName = config.logName || 'Tracer.log';
exports.logPath = config.logPath || '';
exports.logLevel = config.logLevel || 0;
exports.maxFileSize = config.maxFileSize || 20 * 1024;
exports.levelError = s++;
exports.levelWarn = s++;
exports.levelInfo = s++;

// create WriteStream by groble, and don't close the WriteStream forever
var logStream = fs.createWriteStream(this.logPath + this.logName, { 'flags' : 'a' });

exports.verbose = function (logString) {
  try {
    if(this.logLevel > this.levelInfo){
      logString = '[Verbose]' + new Date(Date.now()).toISOString() + ':' + logString + '\r\n';
      logStream.write(logString);
    }
  } catch (e) {
    console.log(e);
  }
}

exports.info = function (logString) {
  try {
    if(this.logLevel > this.levelInfo){
      logString = '[Info]' + new Date(Date.now()).toISOString() + ':' + logString + '\r\n';
      logStream.write(logString);
    }
  } catch (e) {
    console.log(e);
  }
}

exports.warn = function (logString) {
  try {
    if(this.logLevel > this.levelWarn){
      logString = '[Warn]' + new Date(Date.now()).toISOString() + ':' + logString + '\r\n';
      logStream.write(logString);
    }
  } catch (e) {
    console.log(e);
  }
}

exports.error = function (logString) {
  try {
    if(this.logLevel > this.levelError){
      logString = '[Error]' + new Date(Date.now()).toISOString() + ':' + logString + '\r\n';
      console.log(logString);
      logStream.write(logString);
    }
  } catch (e) {
    console.log(e);
  }
}
