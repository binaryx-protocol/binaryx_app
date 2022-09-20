#!/usr/bin/env node

const {connectString, replaceShell} = require("./utils/misc");
const {servers} = require("./servers");

async function main(argv){
    const TARGET_SERVER_NAME = argv[2]
    if (!servers[TARGET_SERVER_NAME]) {
        console.log('Server name is invalid. The full list: ' + Object.keys(servers).join(" "))
        return;
    }
    const cmd = connectString(servers[TARGET_SERVER_NAME])
    console.log('Connecting with:')
    console.log(cmd)
    replaceShell(cmd)
}

main(process.argv)
