const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let command;
    if (client.commands.has(args[0])) {
        command = args[0];
    } else if (client.aliases.has(args[0])) {
        command = client.aliases.get(args[0])
    }
    const embed = new Discord.RichEmbed()
        .setColor(client.color);

    if (message.author.id !== client.ownerID) {
        embed.setFooter('Sorry, this command is reserved for the developers!');
        
        //Send the embed
        return message.channel.send(embed);
    }

    embed.setFooter(`Successfully reloaded: ${args[0]}`);
    client.reload(command)

    message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "reload",
    description: "Reload a file without restarting",
    usage: "reload"
}