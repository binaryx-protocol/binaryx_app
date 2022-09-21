#!/usr/bin/env node

const {autoReleaseDocker} = require("../../libs/misc");
const {config} = require("../../src/config");
const {deployStaging} = require("../../src/docker");

async function  main() {
    const { imageTag } = autoReleaseDocker(config)
    await deployStaging(imageTag)
}

main()
