const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({ intents: 515 });
const Logger = require('./utils/Logger');

client.commands = new Collection();

['CommandUtil', 'EventUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code! ${code} !`)})
process.on('uncaughtException', (err, origin) => {
    Logger.error(`UNCAUGHT_EXCEPTION: ${err}`)
    console.error(`Origine: ${origin}`)
})

process.on('unhandledRejection', (reason, promise) => {
    Logger.warn(`UNHANLED_REJECTION: ${reason}\n -----\n`)
    console.log(promise)
})
process.on('warning',(...args) => Logger.warn(...args))

client.login(process.env.DISCORD_TOKEN);
