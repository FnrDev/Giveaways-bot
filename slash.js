const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
require('colors');
require('dotenv').config();

// setup slash commands
const commands = []
readdirSync("./commands/").map(async dir => {
	readdirSync(`./commands/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `./commands/${dir}/${cmd}`)))
    })
})
const rest = new REST({ version: "10" }).setToken(process.env.token);

(async () => {
	try {
		console.log('[Discord API] Started refreshing application (/) commands.'.yellow);
		await rest.put(
			// if you want to make your slash commands in all guilds use "applicationCommands("CLIENT_ID")"
			Routes.applicationGuildCommands(process.env.botID, process.env.serverID),
			{ body: commands },
		);
		console.log('[Discord API] Successfully reloaded application (/) commands.'.green);
	} catch (error) {
		console.error(error);
	}
})();