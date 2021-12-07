const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "Get bot speed",
    usage: "/ping",
    timeout: 5000,
    run: async(interaction, client) => {
        await interaction.reply('🏓 Pong!')
        const msg = await interaction.fetchReply()
        const embed = new Discord.MessageEmbed()
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .setTimestamp()
        .setDescription(`**Time:** ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)} ms\n**API Ping:** ${client.ws.ping} ms`)
        interaction.editReply({ embeds: [embed], content: null })
    }
}