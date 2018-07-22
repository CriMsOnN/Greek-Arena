const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const channel = message.guild.channels.find('name', 'mod-logs');
    const messagechannel = message.guild.channels.find('name', 'moves');
    if(member.roles.some(r=>["Moderators","HEAD ADMIN", "VIOLOGIKOS"].includes(r.name))) {
        return message.reply('You cant move Moderators or Head Admins');
    }
    if(message.channel.name != messagechannel.name) return;
    if(!member) return message.reply('You have to mention a member');
    if(!message.member.voiceChannel) return message.reply('You have to be on a voice channel');
    if(!member.voiceChannel) return message.reply(`The member you wanna move needs to be on a voice channel`);
	if(member === message.author.username) return message.reply('You can not move your self');
	if(message.member.voiceChannel === member.voiceChannel) return message.reply('You are already on the same voice channel');

    member.setVoiceChannel(message.member.voiceChannel).then(() => {
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - LOGS`)
            .setDescription(`**${member}** moved to **${message.member.voiceChannel}** from **${message.author.username}**`)
            .setFooter(client.footer);
        channel.send(embed);
    })
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "move",
    description: "move",
    usage: "move"
}