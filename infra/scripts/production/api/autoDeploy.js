#!/usr/bin/env node

const {config} = require("../../src/config");
const {deployProduction, appAutoReleaseDocker} = require("../../src/docker");
const {requireSlack, sendSlackMessage} = require("../../libs/slack");

async function  main() {
  requireSlack()
  const { imageTag } = await appAutoReleaseDocker(config)
  await deployProduction(imageTag)
}

main()
