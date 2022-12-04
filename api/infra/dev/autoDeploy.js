#!/usr/bin/env node

const {requireSlack} = require("../../../infra/libs/slack");
const {autoReleaseDockerWithNotify} = require("../../../infra/libs/misc");
const {notify} = require("../../../infra/src/appUtils");
const {deployDevApi} = require("../docker");
const {config} = require("../config");

async function  main() {
  requireSlack()
  const { imageTag } = await autoReleaseDockerWithNotify(config, notify)
  await deployDevApi(imageTag)
}

main()
