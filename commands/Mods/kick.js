const Discord = require('discord.js');

exports.run = async ( client, message, args) => {
    let member = message.mentions.members.first() || null;
    let user = message.mentions.users.first() || null;

    if (member == null) {
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - Kick`)
            .setDescription(`Mention a valid member in ${message.guild.name}`)
        message.channel.send(embed);
        return;
    }

    let kicker = message.author.username;

    let reason;
    if(args[2] != null) {
        reason = args[2].join(" ");
    }
    else {
        reason = `No reason provided by ${kicker}`;
    }

    if(!user.bot) {
        message.guild.member(member).kick();
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - Kick`)
            .setDescription(`Kicked by: **${kicker}** \nReason: **${reason}**`)
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
    name: "kick",
    description: "Kick a member from server",
    usage: "kick"
}