#!/usr/bin/env node

const {servers} = require("../../src/servers");
const {deployScalableImage, getSign} = require("../../src/docker");
const {config} = require("../../src/config");

const example = 'infra/scripts/staging/deploy.js 1.0.31.rc1'

async function main(argv){
    const imageTag = argv[2]
    if (!imageTag) {
        console.log('imageTag is required')
        console.log('Example:')
        console.log(example)
        process.exit(1)
    }

    const sign = await getSign(imageTag)

    try {
        await deployScalableImage(config, servers['i2'], imageTag, '.i2_app_env')
    } catch (e) {
        console.log(config, { text: `i1: deploy -> critical error: ${e.toString()}. ${sign}` })
        console.log('e', e)
    }
}

main(process.argv)
