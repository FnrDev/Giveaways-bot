module.exports = {
    name: "reroll",
    description: "Reroll a giveaway",
    options: [
        {
            name: "giveaway",
            description: "The giveaway to reroll ( message ID or prize )",
            type: 3,
            required: true
        }
    ],
    permissions: "MANAGE_MESSAGES",
    run: async(interaction, client) => {
        const query = interaction.options.getString('giveaway');
        const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) || client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
        if (!giveaway) {
            return interaction.reply({ content: `i can\'t find a giveaway for \`${query}\``, ephemeral: true });
        }
        if (!giveaway.ended) {
            return interaction.reply({ content: ":x: The giveaway is not ended yet.", ephemeral: true })
        }
        try {
            await client.giveawaysManager.reroll(giveaway.messageId);
        } catch (e) {
            return interaction.reply({ content: e, ephemeral: true })
        }
        interaction.reply({ content: "<a:CH_Giveaway:703849482806099968> Giveaway rerolled!" })
    }
}