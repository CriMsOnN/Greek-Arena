const Discord = require('discord.js');


exports.run = async(client, message, args) => {
    var created = message.author.createdAt.toString();

    message.channel.send(`Your name is **${message.author.username}** and you joined on discord first time at **${created.replace("GMT+0000 (Coordinated Universal Time)", "")}**.`);
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "whoami",
    description: "whoami",
    usage: "whoami"
}