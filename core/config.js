"use strict";

const logger = process.logger;
const path = require('path');
const fs = require("fs");
const environment = process.env.NODE_ENV || "development";
const configPath = "../config/";
const mainConfigFiles = [
  "http",
  "i18n",
  "models",
  "stylus",
];


function connectAllConfigs() {
  if (!isMainConfigFilesExist()) {
    throw new Error("All main config files must be exists: " + JSON.stringify(mainConfigFiles))
  }
  let config = {};
  let files = fs.readdirSync(path.join(__dirname, configPath));
  for(let i = 0; i < files.length; i++) {
    let fileName = files[i];
    let requireName = fileName.split(".")[0];
    let filePath = path.join(__dirname, configPath, fileName);
    if (fs.lstatSync(filePath).isDirectory()) {
      continue;
    }
    logger("Connect config file:", requireName);
    config[requireName] = require(filePath);
  }

  return config;
}

function isMainConfigFilesExist() {
  for(let i = 0; i < mainConfigFiles.length; i++) {
    let fileName = mainConfigFiles[i];
    let filePath = path.join(__dirname, configPath, fileName + ".js");
    if (!fs.existsSync(filePath)) {
      return false;
    }
    if (fs.lstatSync(filePath).isDirectory()) {
      return false;
    }
  }
  return true;
}

module.exports = connectAllConfigs();