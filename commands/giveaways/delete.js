module.exports = {
    name: "delete",
    description: "Delete a giveaway.",
    options: [
        {
            name: "message_id",
            description: "Message id for giveaway to delete",
            type: 3,
            required: true
        }
    ],
    giveawayPerms: true,
    run: async(interaction, client) => {
        const giveawayId = interaction.options.getString('message_id');
        const fetchGiveaway = client.giveawaysManager.giveaways.find(r => r.messageId === giveawayId);
        if (!fetchGiveaway) {
            return interaction.reply({ content: `Unable to find giveaway \`${giveawayId}\``, ephemeral: true });
        }
        await client.giveawaysManager.delete(giveawayId);
        interaction.reply({ content: `✅ Successfully deleted giveaway with id \`${giveawayId}\`` })
    }
}