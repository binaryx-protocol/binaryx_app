"use strict";

const getDockerRunCmdScalableVersion = (config, repositoryTag, envFileName) => `
sudo docker run -it -d --rm\\
      -p 80:8080\\
      -v /home/ec2-user/shared/${envFileName}:/shared/.env \\
      -e DEBUG_envFileName=${envFileName}\\
      -e DEBUG_repositoryTag=${repositoryTag}\\
      --ulimit nofile=65535:65535 --name ${config.containerName}\\
      ${config.accountId}/${config.repositoryName}:${repositoryTag}
    `

module.exports = {
  getDockerRunCmdScalableVersion,

}
