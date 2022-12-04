#!/usr/bin/env node

const {config} = require("../../../src/config");
const {notify} = require("../../../src/docker");
const {requireSlack} = require("../../../libs/slack");
const {appAutoReleaseDocker} = require("../../../libs/misc");

async function  main() {
  requireSlack()
  const { imageTag } = await appAutoReleaseDocker(config, notify)
  // await deployProduction(imageTag)
}

main()
