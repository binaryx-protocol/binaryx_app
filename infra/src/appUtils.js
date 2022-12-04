"use strict";
const {sendSlackMessage} = require("../libs/slack");
const {runRemotely} = require("../libs/misc");

const notify = async (text) => await sendSlackMessage({ channel: '#dev-deploys', text })

async function serverInfo(server, config, envFile){
  await runRemotely(server, `ls -la ~/shared`).catch(console.error)
  await runRemotely(server, `cat ~/shared/${envFile}`).catch(console.error)
  await runRemotely(server, `sudo docker exec -it ${config.containerName} "sh env"`).catch(console.error)
  await runRemotely(server, `sudo docker logs ${config.containerName}`).catch(console.error)
}

module.exports = {
  notify,
  serverInfo,
};
