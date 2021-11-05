const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    description: "Shows all bot commands",
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
            if (!cmd) return interaction.reply(`Command \`${command}\` not found.`);
            const embed = new MessageEmbed()
            .setColor(interaction.member.displayHexColor)
            .setTitle(`Command: ${cmd.name}`)
            .setDescription(`${cmd.description}`)
            .addField("Usage", `\`${cmd.usage || 'There are no usage for this command'}\``)
            .setFooter(`Requested by ${interaction.user.tag}`);
            return interaction.reply({ embeds: [embed] });
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
        return interaction.reply({ embeds: [embed] });
    }
}