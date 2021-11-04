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
const { GiveawaysManager } = require('discord-giveaways');

// setup giveaway manager config
client.giveawaysManager = new GiveawaysManager(client, {
	storage: "./giveaways.json",
	default: {
		botsCanWin: false,
		embedColor: "#00FFC1",
		reaction: "🎉",
		embedColorEnd: "#ff0000",
		lastChance: {
			enabled: true,
			content: "⚠️ **LAST CHANCE TO ENTER !** ⚠️",
			threshold: 5000,
			embedColor: "#FF0000"
		}
	}
})

const arr = ["handlers", "events"]
arr.forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.token);