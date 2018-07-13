const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let channel = message.guild.channels.find('name', 'general');
    if(client.maintenance === false) {
       client.maintenance = true;
       return;
    }
    else {
       client.maintenance = false;
       channel.send('@everyone Maintenance is over. Bot is up and running');
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "maintenance",
    description: "Reload a file without restarting",
    usage: "maintenance"
}