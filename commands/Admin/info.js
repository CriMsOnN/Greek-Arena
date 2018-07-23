const Discord = require('discord.js');
const version = require('../../package.json').version;
const os = require('os');

exports.run = async(client, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    const embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setThumbnail(client.user.avatarURL)
        .setTitle(`${message.channel.guild.name} - INFO`)
        .addField('Users Known', client.users.size, true)
        .addField('Developer', 'Cr1MsOn99', true)
        .addField('Bot Version', version, true)
        .addField('OS', `${os.type().replace('_NT', '')} ${os.release().replace('.0.15063', '')}`, true)
        .addField('Bot uptime', `${hours} hours and ${minutes} minutes`, true)
        .setURL('https://github.com/CriMsOnN/Greek-Arena')
    message.channel.send(embed);
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "info",
    description: "Invite link for the bot",
    usage: "info"
}