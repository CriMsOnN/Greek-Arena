const Discord = require('discord.js');


exports.run = async(client, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    const embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(`${message.guild.name} - Shutting down`)
        .setDescription(`Shutting down after **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds`)
        .setFooter(client.footer);
    message.channel.send(embed);
    client.destroy();
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "shutdown",
    description: "Adds a team to scrims",
    usage: "shutdown"
}