#!/usr/bin/env node

const {rootDir, upload, runRemotely} = require("../../../infra/libs/misc");
const {servers} = require("../../../infra/src/servers");

upload(servers['i2_dev_frontend'], rootDir + '/gitignored/env/i2_dev/.i2_dev_frontend_env', '~/shared/.i2_dev_frontend_env')
