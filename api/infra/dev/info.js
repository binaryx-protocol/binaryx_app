#!/usr/bin/env node

const {serverInfo} = require("../../../infra/src/appUtils");
const {servers} = require("../../../infra/src/servers");
const {config} = require("../config");

serverInfo(servers['i2_dev_api'], config, '.i2_dev_api_env')
