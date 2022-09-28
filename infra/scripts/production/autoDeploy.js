#!/usr/bin/env node

const {autoReleaseDocker} = require("../../libs/misc");
const {config} = require("../../src/config");
const {deployProduction} = require("../../src/docker");

async function  main() {
    const { imageTag } = await autoReleaseDocker(config)
    await deployProduction(imageTag)
}

main()
