const Discord = require('discord.js');

exports.run = async ( client, message, args) => {
    let member = message.mentions.members.first() || null;
    let user = message.mentions.users.first() || null;
    let reason = args.slice(1).join(' ');
    if(reason.length < 1) {
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - Kick Error`)
            .setDescription(`You must supply a reason for the kick`)
            .setFooter(client.footer)
        message.channel.send(embed);
        return;
    }
    else if (message.mentions.users.size < 1) {
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${messasge.guild.name} - Kick Error`)
            .setDescription(`You must mention someone to kick him`)
        message.channel.send(embed);
        return;
    }
    else if(!user.bot) {
        message.guild.member(member).kick();
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setAuthor("PUBG EXP. Security", client.embedimage)
            .setTitle(`${message.guild.name} - Kick Reminder`)
            .setThumbnail(client.embedimage)
            .addField('Action:', 'KICK', true)
            .addField('User:', `${user.username}#${user.discriminator}`, true)
            .addField('Staff:', `${message.author.username}#${message.author.discriminator}`, true)
            .addField('Reason:', reason, true)
            .setFooter(client.footer);
        client.channels.get(client.modlogs).send({embed});
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