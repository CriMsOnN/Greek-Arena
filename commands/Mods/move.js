const Discord = require('discord.js');


exports.run = async (client, message, args) => {
    const member = message.mentions.members.first();
    const vc = args.slice(1).join(" ");
    const chan = client.channels.find("name", vc);
    if(!member) return message.reply('You have to mention a member');
    if(!vc) return message.reply('You have to enter the channel name');
    if(!message.member.voiceChannel) return message.reply('You have to be on a voice channel');
    if(!member.voiceChannel) return message.reply(`The member you wanna move needs to be on a voice channel`);
    member.setVoiceChannel(chan).then(() => {
        console.log(`Moved to ${member.displayName} to ${chan}`);
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