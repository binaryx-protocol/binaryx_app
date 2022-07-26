"use strict";

const {servers} = require("../../infra/src/servers");
const {getSign,deployScalableImage} = require("../../infra/libs/misc");
const {notify} = require("../../infra/src/appUtils");
const {config} = require("./config");

const getDockerRunCmdScalableVersion = (config, repositoryTag, envFileName) => `
sudo docker run -it -d --rm\\
      -p 80:3001\\
      -v /home/ec2-user/shared/${envFileName}:/app/.env \\
      -e DEBUG_TAG=${repositoryTag}\\
      --ulimit nofile=65535:65535 --name ${config.containerName}\\
      ${config.accountId}/${config.repositoryName}:${repositoryTag}
    `

async function deployDevApi(imageTag){
  const sign = await getSign(imageTag)
  const cmd = getDockerRunCmdScalableVersion(config, imageTag, '.i2_dev_api_env')
  try {
    await notify(`🙌 Dev Api: deploying... (${sign})`)
    await deployScalableImage(config, servers['i2_dev_api'], cmd, 'http://localhost')
    await notify(`🚀 Dev Api: successfully deployed! (${sign})`)
  } catch (e) {
    await notify(`🚨 Dev Api: critical error during deployment (${sign}). Message: ${e.toString()}`)
    throw e;
  }
}

module.exports = {
  getDockerRunCmdScalableVersion,
  deployDevApi,
}
