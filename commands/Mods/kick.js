const Discord = require('discord.js');

exports.run = async ( client, message, args) => {
    let member = message.mentions.members.first() || null;
    let user = message.mentions.users.first() || null;
    let reason = args.slice(1).join(' ');
    if(reason.length < 1) return message.channel.send(`You did not specify the reason you wanna ban this member`);
    if (message.mentions.users.size < 1) return message.channel.send(`You did not specify the member you want to ban`);
    if(!user.bot) {
        message.guild.member(member).kick();
        const embed2 = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - Kick`)
            .setDescription(`**${user.username}** kicked from **${message.author.username}** with reason ${reason}`)
            .setFooter(client.footer);
        logs.send(embed2);
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