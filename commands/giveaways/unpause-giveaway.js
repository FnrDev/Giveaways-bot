const ms = require("ms");

module.exports = {
    name: "unpause",
    description: "Unpause a giveaway",
    options: [
        {
            name: "giveaway",
            description: "The giveaway to unpause ( message ID or giveaway prize )",
            type: 3,
            required: true
        }
    ],
    giveawayPerms: true,
    run: async(interaction, client) => {
        const query = interaction.options.getString('giveaway');
        const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
        if (!giveaway) {
            return interaction.reply({ content: `i can\'t find a giveaway for \`${query}\``, ephemeral: true });
        }
        if (!giveaway.pauseOptions.isPaused) {
            return interaction.reply({ content: ":x: This giveaway is not paused", ephemeral: true })
        }
        try {
            await client.giveawaysManager.unpause(giveaway.messageId);
            interaction.reply({ content: "<a:CH_Giveaway:703849482806099968> Giveaway Unpaused!" })
        } catch (e) {
            return interaction.reply({ content: e, ephemeral: true })
        }
    }
}