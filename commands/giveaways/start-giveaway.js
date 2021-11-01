const ms = require('ms');

module.exports = {
    name: "start",
    description: "Starts a giveaway.",
    options: [
        {
            name: "duration",
            description: "How long the giveaway should last for.",
            type: 3,
            required: true
        },
        {
            name: "winners",
            description: "How many winners the giveaway should have.",
            type: 4,
            required: true
        },
        {
            name: "prize",
            description: "What the prize of the giveaway should be.",
            type: 3,
            required: true
        },
        {
            name: "channel",
            description: "The channel to start the giveaway in.",
            type: 7,
            channel_types: [0, 5, 6],
            required: true
        }
    ],
    permissions: "MANAGE_MESSAGES",
    run: async(interaction, client) => {
        const channel = interaction.options.getChannel('channel');
        const duration = interaction.options.getString('duration');
        const winner = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        client.giveawaysManager.start(channel, {
            duration: ms(duration),
            prize: prize,
            winnerCount: winner,
            hostedBy: interaction.user
        });
        interaction.reply(`<a:CH_Giveaway:703849482806099968> **Giveaway Started in ${channel}**`)
    }
}