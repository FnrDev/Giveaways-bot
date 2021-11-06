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
require('colors');
const fs = require('fs');

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

const giveawayEvents = fs.readdirSync('./events/giveaways').filter(file => file.endsWith('.js'));

for (const file of giveawayEvents) {
    console.log(`[Giveaways Events] Loading giveaways event: ${file}`.yellow);
    const event = require(`./events/giveaways/${file}`);
    client.giveawaysManager.on(file.split(".")[0], event.bind(null, client));
};

client.login(process.env.token);