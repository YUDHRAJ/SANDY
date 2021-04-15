const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const fs = require('fs');
const client = new Discord.Client({
	disableEveryone: true
});
const config = require('./botconfig.json');
const BOTTOKEN = config.BOTTOKEN;
client.setMaxListeners(0);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();
client.categories = fs.readdirSync('./commands/');

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.login(`${BOTTOKEN}`);
