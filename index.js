const { Client } = require('discord.js');
const client = new Client({ intents: 1 });
const dotenv = require('dotenv');

dotenv.config();

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.DISCORD_TOKEN);
