const Discord = require('discord.js')
const fs = require('fs');
const glob = require('glob');
const path = require('path');

exports.run = async(client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(`${message.guild.name} - Commands Handler`);


    glob.sync(`./commands/${args[0]}/**/*.js`).forEach((file) => {
        require(path.resolve(file));
    })

    let cmd = client.commands.get(args[1])
    cmd.conf.enabled = true;
    embed.setDescription(`Command **${args[1]}** enabled!`);
    embed.setFooter(client.footer);
    message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
}

exports.help = {
    name: "enable",
    description: "Adds a team to scrims",
    usage: "enable"
}