require('colors')
module.exports = client => {
    console.log(`[Discord API] Logged in as ${client.user.tag}`.green);
    client.user.setActivity({ name: "Fnr's Giveaways", type: "WATCHING" })
};