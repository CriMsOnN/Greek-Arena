const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let channel = message.guild.channels.find('name', 'general');
   if (client.user.presence.status === 'dnd') {
       client.user.setStatus("online");
       client.user.setActivity('Scrims');
       channel.send('@everyone Maintenance is over. Bot is up and running');
       return;
   } else {
       client.user.setStatus("dnd");
       client.user.setActivity('maintenance');
       return;
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