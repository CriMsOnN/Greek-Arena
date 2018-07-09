const Discord = require('discord.js');

exports.run = async ( client, message, args) => {
    const logs = message.guild.channels.find('name', 'mod-logs');
    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention or ID!");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You can not unmute a member that is equal to or higher than yourself!");

    let mutedRole = message.guild.roles.find(mR => mR.name === "Muted");

    if(!mutedRole || !toMute.roles.has(mutedRole.id)) return message.channel.send("This user is not muted!");

    await toMute.removeRole(mutedRole);

    
    const embed = new Discord.RichEmbed()
        .setTitle(`${message.guild.name} - UnMute`)
        .setColor(client.color)
        .setDescription(`**${toMute}** unmuted by **${message.author.username}**`)
        .setFooter(client.footer);
    logs.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
}

exports.help = {
    name: "unmute",
    description: "Unmute a user from the server",
    usage: "unmute"
}