/*
Logger class for easy and aesthetically pleasing console logging 
*/
const chalk = require("chalk");
const functions = require("./functions.js");

exports.log = (content, type = "log") =>   {
  /*const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const timestamps = `[${year}/${month}/${day}]`;*/

    var date = new Date();
    var text = functions.getFormattedDate(date);
  switch (type) {
    case "log": {
      return console.log(`${text} ${chalk.cyan(type.toUpperCase())} ${content} `);
    }
    case "warn": {
      return console.log(`${text} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
    }
    case "error": {
      return console.log(`${text} ${chalk.bgRed(type.toUpperCase())} ${content} `);
    }
    case "debug": {
      return console.log(`${text} ${chalk.green(type.toUpperCase())} ${content} `);
    }
    case "cmd": {
      return console.log(`${text} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
    }
    case "ready": {
      return console.log(`${text} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
    }
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
}; 

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");
