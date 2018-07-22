const discord = require('discord.js');


exports.run = async(client, message, args) => {
    const adminchannel = message.guild.channels.find('name', 'admins_channel');
    if(message.channel.name != adminchannel.name) return;
    adminchannel.send('Restarting....')
        .then(msg => client.destroy())
        .then(() => client.login(client.config.botToken));
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "restart",
    description: "restart",
    usage: "restart"
}