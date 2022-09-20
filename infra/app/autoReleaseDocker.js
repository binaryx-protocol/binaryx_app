#!/usr/bin/env node

const {autoReleaseDocker} = require("../../infra/utils/misc");
const {config} = require("./config");

autoReleaseDocker(config)
