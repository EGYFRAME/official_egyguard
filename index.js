const { Client, Intents } = require("discord.js");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
Client.setMaxListeners(0);

const config = require("./src/config");
const connect = require("./src/database/connect");
const ready = require("./src/utils/ready");
const antiCrash = require("./src/utils/antiCrash");
const deployCommands = require("./src/utils/deployCommands");
const server = require("./src/utils/server");
const logo = require("./src/assest/logo");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.MESSAGE_CONTENT,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER"],
});

client.on("ready", async () => {
  connect(client, config);
  ready(client, config);
  server(client, config);
  antiCrash(client, config);
  deployCommands(client, config);

  console.log(
    `\x1b[0m`,
    `\x1b[33m 〢`,
    `\x1b[33m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m ${client.user.tag}`,
    `\x1b[32m ONLINE`,
  );

  console.log(
    `\x1b[0m`,
    `\x1b[33m 〢`,
    `\x1b[33m ${moment(Date.now()).format("LT")}`,
    `\x1b[31m SUN™&Co Smash Legends`,
    `\x1b[32m CHECKED`,
  );
});

client.once("ready", async () => {
  const loadCommands = (directory) => {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        loadCommands(fullPath); // Recursively load commands in subdirectories
      } else if (file.endsWith(".js")) {
        try {
          const command = require(fullPath);
          if (typeof command === "function") {
            command(client, config);
            //console.log(`Command loaded: ${file}`);
          } else {
            console.error(
              `Invalid export in file ${file}. Expected a function.`,
            );
          }
        } catch (error) {
          console.error(`Error loading command file ${file}:`, error.message);
        }
      }
    });
  };

  const commandsDirectory = path.join(__dirname, "src/commands");
  loadCommands(commandsDirectory);

  const buttonsDirectory = path.join(__dirname, "src/buttons");
  fs.readdir(buttonsDirectory, (error, files) => {
    if (error) {
      console.error("Error reading buttons directory:", error.message);
      return;
    }
    files.forEach((file) => {
      if (file.endsWith(".js")) {
        try {
          const buttonPath = path.join(buttonsDirectory, file);
          const button = require(buttonPath);
          if (typeof button === "function") {
            button(client, config);
            //console.log(`Button loaded: ${file}`);
          } else {
            console.error(
              `Invalid export in file ${file}. Expected a function.`,
            );
          }
        } catch (error) {
          console.error(`Error loading button file ${file}:`, error.message);
        }
      }
    });
  });
});

client
  .login(config.token)
  .catch((error) => console.error("Token Error:", error.message));
