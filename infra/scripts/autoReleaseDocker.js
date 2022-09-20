#!/usr/bin/env node

const {autoReleaseDocker} = require("../libs/misc");
const {config} = require("../src/config");

autoReleaseDocker(config)
