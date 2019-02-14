const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const member = message.mentions.members.first()
    const channel = message.guild.channels.find('name', 'mod-logs');
    const messagechannel = client.channels.get("470210268132147226");
    const user = message.author.id;
    let headadminRole = message.guild.roles.find(mR => mR.name === "HEAD ADMIN");

    if(message.channel.id != "470210268132147226") return;
    if(!member) return message.reply('You have to mention a member');
    if(member.id === message.author.id) return message.reply('You can not move your self');
    if(!message.member.voiceChannel) return message.reply('You have to be on a voice channel');
    if(!member.voiceChannel) return message.reply(`The member you wanna move needs to be on a voice channel`);
    if(message.member.voiceChannel === member.voiceChannel) return message.reply('You are already on the same voice channel');
    if(member.roles.some(r=>["Head Community Manager","Community Manager","PGC"].includes(r.name))) {
        return message.reply('You cant move members from our staff');
    }
    member.setVoiceChannel(message.member.voiceChannel).then(() => {
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - LOGS`)
            .setDescription(`**${member}** moved to **${message.member.voiceChannel}** from **${message.author.username}**`)
            .setFooter(client.footer);
        channel.send(embed);
    })
	
	message.reply(`**${member}** moved to **${message.member.voiceChannel}**`);
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