const ms = require('ms');

module.exports = {
    name: "edit",
    description: "Edit a exitsted giveaway",
    giveawayPerms: true,
    options: [
        {
            name: "message_id",
            description: "Message id for giveaway to edit",
            type: 3,
            required: true
        },
        {
            name: "winners",
            description: "New winners count",
            type: 4
        },
        {
            name: "duration",
            description: "New time for giveaway.",
            type: 3
        },
        {
            name: "prize",
            description: "New prize for giveaway",
            type: 3
        }
    ],
    run: async(interaction, client) => {
        const giveawayID = interaction.options.getString('message_id');
        const winners = interaction.options.getInteger('winners');
        const duration = interaction.options.getString('duration');
        const prize = interaction.options.getString('prize');
        const fetchGiveaway = client.giveawaysManager.giveaways.find(r => r.messageId === giveawayID);
        if (!fetchGiveaway) {
            return interaction.reply({ content: `Unable to find giveaway \`${giveawayID}\``, ephemeral: true });
        }
        if (fetchGiveaway.ended) {
            return interaction.reply({ content: `You can\'t edit a ended giveaway`, ephemeral: true });
        }
        if (winners) {
            await client.giveawaysManager.edit(giveawayID, {
                newWinnerCount: winners
            });
            return interaction.reply({ content: "✅ Giveaway has been edited" })
        }
        if (duration) {
            await client.giveawaysManager.edit(giveawayID, {
                newExtraData: ms(duration)
            });
            return interaction.reply({ content: "✅ Giveaway has been edited" })
        }
        if (prize) {
            await client.giveawaysManager.edit(giveawayID, {
                newPrize: prize
            });
            return interaction.reply({ content: "✅ Giveaway has been edited" })
        }
    }
}