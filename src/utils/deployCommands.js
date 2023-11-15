const config = require("../config");
const moment = require("moment");

module.exports = async (client, config) => {
  let guild = client.guilds.cache.get(config.guildID);
  if (guild) {
    try {
      await guild.commands.set([
        {
          name: "verification_setup",
          description: `[Dev] Launch setup menu to choose between open, close and developer modes`,
          type: "CHAT_INPUT",
          options: [
            {
              name: "channel",
              description: "Choose channel you want to send your message in",
              type: 7, // CHANNEL
              required: true,
            },
          ],
        },
        {
          name: "timeout",
          description: "Set a timeout for the channel",
          options: [
            {
              name: "user",
              description: "The user to be timed out.",
              type: 6, // User Type
              required: true,
            },
            {
              name: "duration",
              description: "Select the duration for the timeout",
              type: 3,
              choices: [
                {
                  name: "1 minute",
                  value: "60000",
                },
                {
                  name: "5 minutes",
                  value: "300000",
                },
                {
                  name: "10 minutes",
                  value: "600000",
                },
                {
                  name: "1 hour",
                  value: "3600000",
                },
                {
                  name: "1 week",
                  value: "10080000",
                },
              ],
              required: true,
            },
            {
              name: "reason",
              description: "The reason for the timeout.",
              type: 3, // String Type
              required: false,
              min_length: 1,
              max_length: 512,
            },
          ],
        },
        {
          name: "about",
          description: `[Dev] Learn more about Parfait bot`,
          type: "CHAT_INPUT",
        },
        {
          name: "feedback",
          description: `[Dev] Send your feedback about Parfait to her developer`,
          type: "CHAT_INPUT",
        },
        {
          name: "report_bug",
          description: `[Dev] Report a bug to the developer`,
          type: "CHAT_INPUT",
        },
        {
          name: "contact_dev",
          description: `[Dev] Send a message to parfait developer`,
          type: "CHAT_INPUT",
        },
        {
          name: "status",
          description: `[Dev] Check Parfait Uptime`,
          type: "CHAT_INPUT",
        },
        {
          name: "ping",
          description: `[Dev] Check Parfait latency`,
          type: "CHAT_INPUT",
        },
        {
          name: "echo",
          description: `[Dev] Parfait will send your message`,
          options: [
            {
              name: "channel",
              description: "Choose channel you want to send your message in",
              type: 7, // CHANNEL
              required: true,
            },
            {
              name: "message",
              description: "Type your echo message",
              type: 3, // STRING
              required: true,
              min_length: 2,
              max_length: 1000,
            },
          ],
        },
      ]);
      console.log(
        `\x1b[0m`,
        `\x1b[33m 〢`,
        `\x1b[33m ${moment(Date.now()).format("LT")}`,
        `\x1b[31m Slash Commands`,
        `\x1b[32m LOADED`,
      );
    } catch (error) {
      console.log(
        `\x1b[0m`,
        `\x1b[33m 〢`,
        `\x1b[33m ${moment(Date.now()).format("LT")}`,
        `\x1b[31m Slash Commands`,
        `\x1b[323m ERROR: ${error.message}`,
      );
    }
  }
};
