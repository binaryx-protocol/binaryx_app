#!/usr/bin/env node

const {deployProduction} = require("../../src/docker");

function main() {
    const example = 'infra/scripts/production/deploy.js 1.0.31.rc1'
    const imageTag = process.argv[2]
    if (!imageTag) {
        console.log('imageTag is required')
        console.log('Example:')
        console.log(example)
        process.exit(1)
    }

    deployProduction(process.argv[2])
}

main()
