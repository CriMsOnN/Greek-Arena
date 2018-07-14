const Discord = require('discord.js');


exports.run = async (client, message) => {
    const logs = message.guild.channels.find('name', 'mod-logs');
    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());

    let user;
    if(entry.extra.channel.id === message.channel.id && entry.target.id === message.author.id && entry.createdTimestamp > (Date.now() - 5000) && entry.extra.count >= 1) {
        user = entry.executor.username;
    } else {
        user = message.author.username;
    }

    const embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(`${message.guild.name} - LOGS`)
        .setDescription(`A message was deleted in **${message.channel.name}** by **${user}**`);
    logs.send(embed);
}