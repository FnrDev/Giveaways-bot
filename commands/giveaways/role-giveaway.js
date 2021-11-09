const ms = require('ms');

module.exports = {
    name: "start-role",
    description: "Starts a giveaway with specific role to participate.",
    usage: "/start-role duration:**1m** winners:**5** prize:**VIP Role** role:**@members** channel:**#giveaway**",
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
            name: "role",
            description: "Require role to participate in the giveaway.",
            type: 8,
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
    giveawayPerms: true,
    run: async(interaction, client) => {
        const channel = interaction.options.getChannel('channel');
        const duration = interaction.options.getString('duration');
        const winner = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        const role = interaction.options.getRole('role');
        await client.giveawaysManager.start(channel, {
            duration: ms(duration),
            prize: prize,
            winnerCount: winner,
            hostedBy: interaction.user,
            exemptMembers: (member) => !member.roles.cache.some(r => r.id === role.id),
            messages: {
                drawing: `End At: {timestamp}`,
                endedAt: "Ended At",
                winMessage: `🎉🎉 Congratulations, {winners}! You won **{this.prize}**!🎉🎉\n{this.messageURL}`
            }
        });
        interaction.reply(`<a:CH_Giveaway:703849482806099968> **Giveaway Started in ${channel}**`)
    }
}