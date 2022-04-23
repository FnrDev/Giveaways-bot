const ms = require('ms');

module.exports = {
    name: "end",
    description: "End a giveaway",
    usage: "/end <message id / giveaway prize>",
    options: [
        {
            name: "giveaway",
            description: "The giveaway to end ( message ID or giveaway prize )",
            type: 3,
            required: true
        }
    ],
    giveawayPerms: true,
    run: async(interaction, client) => {
        const query = interaction.options.getString('giveaway');
        const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
        if (!giveaway) {
            return interaction.reply({ content: `:x: i can\'t find a giveaway for \`${query}\``, ephemeral: true })
        }
        if (giveaway.ended) {
            return interaction.reply({ content: ":x: This giveaway is already ended", ephemeral: true });
        }
        try {
            await client.giveawaysManager.end(giveaway.messageId);
            interaction.reply({ content: "<a:CH_Giveaway:703849482806099968> Giveaway ended" })
        } catch (e) {
            return interaction.reply({ content: e, ephemeral: true })
        }
    }
}