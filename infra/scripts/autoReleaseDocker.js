#!/usr/bin/env node

const {config} = require("../src/config");
const {appAutoReleaseDocker} = require("../src/docker");

appAutoReleaseDocker(config)
