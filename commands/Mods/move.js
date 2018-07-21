const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const channel = message.guild.channels.find('name', 'mod-logs');
    const messagechannel = message.guild.channels.find('name', 'moves');
    const vc = args.slice(1).join(" ");
    const chan = client.channels.find("name", vc);
    if(message.channel.name != messagechannel.name) return;
    if(!member) return message.reply('You have to mention a member');
    if(!message.member.voiceChannel) return message.reply('You have to be on a voice channel');
    if(!member.voiceChannel) return message.reply(`The member you wanna move needs to be on a voice channel`);

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