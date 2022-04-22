const Timeout = new Set()
const { MessageEmbed } = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = async(client, interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
		if (!client.commands.has(interaction.commandName)) return;
		if (!interaction.guild) return;
		const command = client.commands.get(interaction.commandName)
		try {
			if (command.timeout) {
				if (Timeout.has(`${interaction.user.id}${command.name}`)) {
					const embed = new MessageEmbed()
					.setTitle('You are in timeout!')
					.setDescription(`You need to wait **${humanizeDuration(command.timeout, { round: true })}** to use command again`)
					.setColor('#ff0000')
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			if (command.permissions) {
				if (!interaction.member.permissions.has(command.permissions)) {
					const embed = new MessageEmbed()
					.setTitle('Missing Permission')
					.setDescription(`:x: You need \`${command.permissions}\` to use this command`)
					.setColor('#ff0000')
					.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
					.setTimestamp()
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			if (command.devs) {
				if (!process.env.owners.split(',').includes(process.env.owners)) {
					return interaction.reply({ content: ":x: Only devs can use this command", ephemeral: true });
				}
			}
			if (command.ownerOnly) {
				if (interaction.user.id !== interaction.guild.ownerId) {
					return interaction.reply({ content: "Only ownership of this server can use this command", ephemeral: true })
				}
			}
			if (command.giveawayPerms) {
				if (!interaction.member.roles.cache.some(r => r.name.toLowerCase() === 'giveaway') && !interaction.member.permissions.has('MANAGE_MESSAGES')) {
					const embed = new MessageEmbed()
					.setTitle('Missing Permission')
					.setDescription(`:x: You need \`Giveaway\` role or \`MANAGE MESSAGES\` Permission to use this command.`)
					.setColor('#ff0000')
					.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
					.setTimestamp()
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			command.run(interaction, client);
			Timeout.add(`${interaction.user.id}${command.name}`)
			setTimeout(() => {
				Timeout.delete(`${interaction.user.id}${command.name}`)
			}, command.timeout);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });
		}
	}
} 