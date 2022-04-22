const Discord = require('discord.js')

module.exports = async(client, giveaway, winners) => {
    const channel = client.channels.cache.get(process.env.log);
    if (!channel) return;
    let winnersText = '';
    winners.forEach(member => {
        winnersText += `<@${member.user.id}> `
    })
    const embed = new Discord.MessageEmbed()
    .setTitle('Giveaway Rerolled')
    .setColor('#00FFC1')
    .setTimestamp()
    .setFooter({ text: giveaway.messageId })
    .addFields(
        {
            name: "Hosted By:",
            value: giveaway.data.hostedBy
        },
        {
            name: "Giveaway Prize:",
            value: giveaway.data.prize
        },
        {
            name: "Giveaway Started At:",
            value: `**<t:${giveaway.data.startAt.toString().slice(0, 10)}:R>**`
        },
        {
            name: "Giveaway End At:",
            value: `**<t:${giveaway.data.endAt.toString().slice(0, 10)}:R>**`
        },
        {
            name: "Giveaway Winner(s)",
            value: winnersText
        },
    )
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setStyle('LINK')
        .setLabel('Giveaway URL')
        .setURL(giveaway.messageURL)
    )
    channel.send({ embeds: [embed], components: [row] })
}