#!/usr/bin/env node

const {config} = require("../../src/config");
const {servers} = require("../../src/servers");
const {serverInfo} = require("../../src/docker");

async function  main() {
    await serverInfo(servers['i2'], config, '.i2_app_env')
}

main()
