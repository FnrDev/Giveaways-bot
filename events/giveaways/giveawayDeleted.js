const Discord = require('discord.js');

module.exports = async(client, giveaway) => {
    const channel = client.channels.cache.get(process.env.log);
    if (!channel) return;
    let winners = ''
    giveaway.winnerIds.forEach(id => {
        winners += `<@${id}> ,`
    })
    const embed = new Discord.MessageEmbed()
    .setTitle('Giveaway Deleted')
    .setColor('#00FFC1')
    .setTimestamp()
    .addFields(
        {
            name: "Hosted by:",
            value: giveaway.data.hostedBy
        },
        {
            name: "Giveaway Started At:",
            value: `**<t:${giveaway.data.startAt.toString().slice(0, 10)}:R>**`
        },
        {
            name: "Giveaway End At:",
            value: `**<t:${giveaway.data.endAt.toString().slice(0, 10)}:R>**`
        }
    )
    channel.send({ embeds: [embed] })
}