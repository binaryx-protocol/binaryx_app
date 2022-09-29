#!/usr/bin/env node

const {rootDir, upload, runRemotely} = require("../../libs/misc");
const {servers} = require("../../src/servers");

async function  main() {
    await runRemotely(servers['i1'], 'mkdir -p ~/shared/')
    await upload(servers['i1'], rootDir + '/gitignored/env/i1/.i1_app_env', '~/shared/.i1_app_env')
}

main()
