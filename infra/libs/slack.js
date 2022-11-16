require('dotenv').config({ path: __dirname + '/../.env' })

const axios = require('axios');

const requireSlack = () => {
  const slackToken = process.env.SLACK_PRIVATE_KEY;
  if (!slackToken) {
    throw ".env : SLACK_PRIVATE_KEY is required!"
  }
}

const sendSlackMessage = async ({ channel, text }) => {
  const slackToken = process.env.SLACK_PRIVATE_KEY;
  const url = 'https://slack.com/api/chat.postMessage';
  const res = await axios.post(url, {
    channel,
    text,
  }, { headers: { authorization: `Bearer ${slackToken}` } });
}

module.exports = {
  requireSlack,
  sendSlackMessage,
}
