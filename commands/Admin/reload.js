const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(message.channel.id != client.config.admin_channel) return;
    let command;
    if (client.commands.has(args[1])) {
        command = args[1];
    } else if (client.aliases.has(args[1])) {
        command = client.aliases.get(args[1])
    }
    const embed = new Discord.RichEmbed()
        .setColor(client.color);

    if (message.author.id !== client.ownerID) {
        embed.setFooter('Sorry, this command is reserved for the developers!');
        
        //Send the embed
        return message.channel.send(embed);
    }

    embed.setFooter(`Successfully reloaded: ${args[1]}`);
    client.reload(args[0], command)

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