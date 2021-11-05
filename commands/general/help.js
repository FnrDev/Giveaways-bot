const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    description: "Shows all bot commands",
    usage: "/help command:**ping**",
    options: [
        {
            name: "command",
            description: "Command you need help for.",
            type: 3
        }
    ],
    run: async(interaction, client) => {
        const command = interaction.options.getString('command');
        if (command) {
            const cmd = client.commands.get(command);
            if (!cmd) {
                return interaction.reply(`Command \`${command}\` not found.`);
            }
            const embed = new MessageEmbed()
            .setColor(interaction.member.displayHexColor)
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
            if (cmd.name) {
                embed.setTitle(`Command: ${cmd.name}`)
            }
            if (cmd.description) {
                embed.setDescription(cmd.description)
            }
            if (cmd.usage) {
                embed.addField('Example:', cmd.usage);
            }
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
        let loopAllCommands = '';
        client.commands.forEach(cmd => {
            if (cmd.name === 'help') return;
            if (!cmd.description) return;
            loopAllCommands += `\`/${cmd.name}\` - ${cmd.description}\n`;
        });
        const embed = new MessageEmbed()
        .setColor(interaction.member.displayHexColor)
        .setTitle("All commands")
        .setDescription(loopAllCommands)
        .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }));
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}