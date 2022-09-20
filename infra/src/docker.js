"use strict";

const {loginAndStopImage, runRemotely, waitForHealthyRemotely,color, machineUserAndId} = require("../libs/misc");

const getDockerRunCmdScalableVersion = (config, repositoryTag, envFileName) => `
sudo docker run -it -d --rm\\
      -p 80:3000\\
      -v /home/ec2-user/shared:/shared
      -e DEBUG_ENV_FILE=/home/ec2-user/shared/${envFileName}\\
      --env-file /home/ec2-user/shared/${envFileName}\\
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

module.exports = {
    getDockerRunCmdScalableVersion,
    deployScalableImage,
    getSign,
};
