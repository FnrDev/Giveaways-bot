const ms = require('ms');
const Discord = require('discord.js');
const messages = require('../../util/messages');
const settings = require('../../settings.json');

module.exports = {
    name: "start",
    description: "Starts a giveaway.",
    usage: "/start duration:**1m** winners:**5** prize:**VIP Role** channel:**#giveaway**",
    options: [
        {
            name: "duration",
            description: "How long the giveaway should last for.",
            type: 3,
            required: true
        },
        {
            name: "prize",
            description: "What the prize of the giveaway should be.",
            type: 3,
            required: true
        },
        {
            name: "winners",
            description: "How many winners the giveaway should have.",
            type: 4,
        },
        {
            name: "channel",
            description: "The channel to start the giveaway in.",
            type: 7,
            channel_types: [0, 5, 6],
        }
    ],
    giveawayPerms: true,
    run: async(interaction, client) => {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const duration = interaction.options.getString('duration');
        const winner = interaction.options.getInteger('winners') || 1;
        const prize = interaction.options.getString('prize');
        const giveawayInfo = await client.giveawaysManager.start(channel, {
            duration: ms(duration),
            prize: prize,
            winnerCount: winner,
            hostedBy: interaction.user,
            banner: settings.bannerURL,
            thumbnail: interaction.guild.iconURL(),
            messages
        });
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setStyle('LINK')
            .setLabel('Giveaway URL')
            .setURL(giveawayInfo.messageURL)
        )
        interaction.reply({ content: `<a:CH_Giveaway:703849482806099968> **Giveaway Started in ${channel}**`, components: [row] });
    }
}