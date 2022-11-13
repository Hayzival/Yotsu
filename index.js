const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({ intents: 515 });
const Logger = require('./utils/Logger');
const mysql = require('mysql');

['commands', 'buttons', 'selects'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'SelectUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

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

const db = new mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
})

db.connect(function (err) {
    if (err) throw err;
    Logger.client(`Connecté à la base de données MySQL!`)   
})


client.login(process.env.DISCORD_TOKEN);
