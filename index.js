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

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
	async getAllGiveaways() {
		let all = await client.db.all("giveaways");
		return all.map(obj => obj.data);
	}

	async saveGiveaway(messageID, giveawayData) {
		await client.db.set("giveaways", messageID, giveawayData);
		return true;
	}

	async editGiveaway(messageID, giveawayData) {
		await client.db.set("giveaways", messageID, giveawayData);
		return true;
	}

	async deleteGiveaway(messageID) {
		await client.db.delete("giveaways", messageID);
		return true;
	}
}

const manager = new GiveawayManagerWithOwnDatabase(client, {
	storage: false,
	default: {
		reaction: process.env.EMOJI,
		embedColor: process.env.COLOR,
		embedColorEnd: process.env.END_COLOR,
		lastChance: {
			enabled: true,
			content: "**LAST CHANCE TO ENTER !**",
			threshold: 5000
		}
	}
});

client.giveaway = manager;

const arr = ["handlers", "events"]
arr.forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// loop giveaways events files
const giveawayEvents = fs.readdirSync('./events/giveaways').filter(file => file.endsWith('.js'));
for (const file of giveawayEvents) {
    console.log(`[Giveaways Events] Loading giveaways event: ${file}`.yellow);
    const event = require(`./events/giveaways/${file}`);
    client.giveawaysManager.on(file.split(".")[0], event.bind(null, client));
};

client.login(process.env.token);