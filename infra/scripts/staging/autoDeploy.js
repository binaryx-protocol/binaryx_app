#!/usr/bin/env node

const {config} = require("../../src/config");
const {deployStaging, appAutoReleaseDocker} = require("../../src/docker");
const {requireSlack, sendSlackMessage} = require("../../libs/slack");

async function  main() {
  requireSlack()
  const { imageTag } = await appAutoReleaseDocker(config)
  await deployStaging(imageTag)
}

main()
