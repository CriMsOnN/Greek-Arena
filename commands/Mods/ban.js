const Discord = require('discord.js');


exports.run = async ( client, message, args) => {
    let member = message.mentions.members.first() || null;
    let user = message.mentions.users.first() || null;

    if (member == null) {
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - Ban`)
            .setDescription(`Mention a valid member in ${message.guild.name}`)
        message.channel.send(embed);
        return;
    }

    let Banner = message.author.username;

    let reason = args.slice(1).join(" ");
    if (args[1] != null) {
        reason = args.slice(1).join(" ");
    }
    else {
        reason = `No reason provided by ${banner}`;
    }

    if(!user.bot) {
        message.guild.member(member).ban(reason);
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - Ban`)
            .setDescription(`Kicked by: **${Banner}** \nReason: **${reason}**`)
            .setFooter(client.footer);
        message.channel.send(embed);

    }
    
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
}

exports.help = {
    name: "ban",
    description: "Ban a user from the server",
    usage: "Ban"
}