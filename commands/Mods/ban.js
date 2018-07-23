const Discord = require('discord.js');


exports.run = async ( client, message, args) => {
    const logs = message.guild.channels.find('name', 'mod-logs');;
    let member = message.mentions.members.first() || null;
    let user = message.mentions.users.first() || null;
    if (member == null) return message.channel.send(`You did not specify a user mention or ID!`);
    let banner = message.author.username;

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
            .setTitle(`${message.guild.name} - LOGS`)
            .setDescription(`**${member}** banned by **${banner}** with reason **${reason}**`)
            .setFooter(client.footer);
        logs.send(embed);
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