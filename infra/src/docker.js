"use strict";

const {loginAndStopImage, runRemotely, waitForHealthyRemotely,color, machineUserAndId, autoReleaseDocker, getCommitHash} = require("../libs/misc");
const {config} = require("./config");
const {servers} = require("./servers");
const {sendSlackMessage} = require("../libs/slack");

const getDockerRunCmdScalableVersion = (config, repositoryTag, envFileName) => `
sudo docker run -it -d --rm\\
      -p 80:3000\\
      -v /home/ec2-user/shared/${envFileName}:/shared/.env \\
      -e DEBUG_envFileName=${envFileName}\\
      -e DEBUG_repositoryTag=${repositoryTag}\\
      --ulimit nofile=65535:65535 --name ${config.containerName}\\
      ${config.accountId}/${config.repositoryName}:${repositoryTag}
    `

const deployScalableImage = async (config, server, imageTag, envFileName) => {
    console.log(color.yellow(`\n\n===== ${server.host}`))
    console.log(color.grey(JSON.stringify({imageTag, envFileName})))
    console.log("\n\n")

    await loginAndStopImage(config, server)
    const cmd = getDockerRunCmdScalableVersion(config, imageTag, envFileName)
    await runRemotely(server, cmd)
    await waitForHealthyRemotely(config, server, {
        url: 'http://localhost',
        delay: '15',
        logLines: '1',
    })
}

const getSign = async (imageTag) => {
    const me = await machineUserAndId()
    return `(${imageTag} by ${me})`
}

const notify = async (text) => await sendSlackMessage({ channel: '#dev-deploys', text })

async function deployStaging(imageTag){
    const who = await getSign(imageTag)
    try {
      await notify(`Staging: deploying... (${imageTag} by ${who})`)
      await deployScalableImage(config, servers['i2'], imageTag, '.i2_app_env')
      await notify(`Staging: successfully deployed! (${imageTag} by ${who})`)
    } catch (e) {
      await notify(`Staging: critical error during deployment (${who}). Message: ${e.toString()}`)
      throw e;
    }
}

async function deployProduction(imageTag){
    const who = await getSign(imageTag)
    try {
      await notify(`Production: deploying... (${imageTag} by ${who})`)
        await deployScalableImage(config, servers['i1'], imageTag, '.i1_app_env')
      await notify(`Production: successfully deployed! (${imageTag} by ${who})`)
    } catch (e) {
      await notify(`Production: critical error during deployment (${who}). Message: ${e.toString()}`)
      throw e;
    }
}

async function appAutoReleaseDocker(config) {
  const who = await machineUserAndId()
  const tag = await getCommitHash()
  await notify(`...building an image ${tag} by ${who}`)
  return await autoReleaseDocker(config)
}

async function serverInfo(server, config, envFile){
    await runRemotely(server, `ls -la ~/shared`).catch(console.error)
    await runRemotely(server, `cat ~/shared/${envFile}`).catch(console.error)
    await runRemotely(server, `sudo docker exec -it ${config.containerName} "sh env"`).catch(console.error)
    await runRemotely(server, `sudo docker logs ${config.containerName}`).catch(console.error)
}

module.exports = {
    getDockerRunCmdScalableVersion,
    deployScalableImage,
    getSign,
    deployStaging,
    deployProduction,
    serverInfo,
  appAutoReleaseDocker,
};
