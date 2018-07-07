const Discord = require('discord.js')
const fs = require('fs');
const glob = require('glob');
const path = require('path');

exports.run = async(client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(`${message.guild.name} - Commands Handler`);


    glob.sync('./commands/**/*.js').forEach((file) => {
        require(path.resolve(file));
    })

    let cmd = client.commands.get(args[0])
    cmd.conf.enabled = true;
    embed.setDescription(`Command **${args[0]}** enabled!`);
    embed.setFooter(client.footer);
    message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "enable",
    description: "Adds a team to scrims",
    usage: "enable"
}