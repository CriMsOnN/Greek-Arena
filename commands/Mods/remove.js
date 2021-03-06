const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const member = message.mentions.members.first()
    const channel = message.guild.channels.find('name', 'mod-logs');
    const messagechannel = message.guild.channels.find('name', 'moves');
    const user = message.author.id;
    let headadminRole = message.guild.roles.find(mR => mR.name === "HEAD ADMIN");
    if(message.channel.name != messagechannel.name) return;
    if(!member) return message.reply('You have to mention a member');
    if(member.id === message.author.id) return message.reply('You can not move your self');
    if(!message.member.voiceChannel) return message.reply('You have to be on a voice channel');
    if(!member.voiceChannel) return message.reply(`The member you wanna remove needs to be on the same voice channel with you`);
    if(member.roles.some(r=>["Moderators","HEAD ADMIN", "VIOLOGIKOS"].includes(r.name))) {
        return message.reply('You cant move Moderators or Head Admins');
    }
    if(message.member.voiceChannel === member.voiceChannel) {
        member.setVoiceChannel('470342165390688258').then(() => {
            const embed = new Discord.RichEmbed()
                .setColor(client.color)
                .setTitle(`${message.guild.name} - LOGS`)
                .setDescription(`**${member}** removed **${message.member.voiceChannel}** from **${message.author.username}**`)
                .setFooter(client.footer);
            channel.send(embed);
        })
    }
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "remove",
    description: "remove",
    usage: "remove"
}