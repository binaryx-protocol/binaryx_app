#!/usr/bin/env node

const {autoReleaseDocker} = require("../../libs/misc");
const {config} = require("../../src/config");
const {deployStaging} = require("../../src/docker");
const {requireSlack, sendSlackMessage} = require("../../libs/slack");

async function  main() {
  requireSlack()
  const { imageTag, who } = await autoReleaseDocker(config)
  await sendSlackMessage({ channel: '#dev-deploys', text: `Staging: deploying. (${imageTag} by ${who})` })
  await deployStaging(imageTag)
  await sendSlackMessage({ channel: '#dev-deploys', text: `Staging: success! (${imageTag} by ${who})` })
}

main()
