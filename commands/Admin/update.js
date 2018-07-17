const Discord = require('discord.js');


exports.run = async (client, message, args) => {
    if(args[0] == 'greekarenabot') {
        const channel = message.guild.channels.find('name', 'greekarenabot-updates');
        const text = args.slice(1).join(" ");
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setThumbnail(message.guild.iconURL)
            .setDescription(`**Greek Arena Bot** updated by: **${message.author}**\n\n ${text}`)
            .setFooter(client.footer)
            .setTimestamp();
        channel.send(embed);
    }
    else if(args[0] == 'autobot') {
        const channel = message.guild.channels.find('name', 'autobot-updates');
        const text = args.slice(1).join(" ");
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setThumbnail(message.guild.iconURL)
            .setDescription(`**Auto Bot** updated by: **${message.author}**\n\n ${text}`)
            .setFooter(client.footer)
            .setTimestamp();
        channel.send(embed);
    }
    else {
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
    name: "update",
    description: "posts the updates",
    usage: "update botname text"
}