const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MEMBERS'
    ]
});
require('dotenv').config();
client.commands = new Discord.Collection();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const { GiveawaysManager } = require('discord-giveaways');
const path = require('path');
require('colors');

// setup giveaway manager config
client.giveawaysManager = new GiveawaysManager(client, {
	storage: "./giveaways.json",
	default: {
		botsCanWin: false,
		embedColor: "#00FFC1",
		reaction: "🎉",
		lastChance: {
			enabled: true,
			content: "⚠️ **LAST CHANCE TO ENTER !** ⚠️",
			threshold: 5000,
			embedColor: "#FF0000"
		}
	}
})

// setup slash commands
const commands = []
readdirSync("./commands/").map(async dir => {
	readdirSync(`./commands/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `./commands/${dir}/${cmd}`)))
    })
})
const rest = new REST({ version: "9" }).setToken(process.env.token);

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

const arr = ["handlers", "events"]
arr.forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.token);