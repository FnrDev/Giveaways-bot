const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = (client, giveaway, member, reaction) => {
    const embed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`**You participated in the giveaway**`)
    .setColor(member.displayHexColor)
    .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .addFields(
        {
            name: "Giveaway Prize:",
            value: giveaway.prize,
        }
    )
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setStyle('LINK')
        .setLabel('Giveaway URL')
        .setURL(`https://discord.com/channels/${member.guild.id}/${giveaway.channelId}/${giveaway.messageId}`)
    )
    try {
        member.send({ embeds: [embed], components: [row] })
    } catch (e) {
        return;
    }
}