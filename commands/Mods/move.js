const Discord = require('discord.js');


exports.run = async (client, message, args) => {
    const member = message.mentions.members.first();
    const channel = message.guild.channels.find('name', 'mod-logs');
    const messagechannel = message.guild.channels.find('name', 'moves');
    if(message.channel.name != messagechannel.name) return;
    const vc = args.slice(1).join(" ");
    const chan = client.channels.find("name", vc);
    if(!member) return message.reply('You have to mention a member');
    if(!vc) return message.reply('You have to enter the channel name');
    if(!message.member.voiceChannel) return message.reply('You have to be on a voice channel');
    if(!member.voiceChannel) return message.reply(`The member you wanna move needs to be on a voice channel`);
    member.setVoiceChannel(chan).then(() => {
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - LOGS`)
            .setDescription(`**${member}** moved to **${chan}** from **${message.author.username}**`)
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