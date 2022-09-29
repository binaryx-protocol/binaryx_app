#!/usr/bin/env node

const {rootDir, upload} = require("../../libs/misc");
const {servers} = require("../../src/servers");

async function  main() {
    await upload(servers['i2'], rootDir + '/gitignored/env/i2/.i2_app_env', '~/shared/.i2_app_env')
}

main()
