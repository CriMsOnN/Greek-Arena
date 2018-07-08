const Discord = require('discord.js');

exports.run = async (client, guild, user) => {
    const logs = guild.channels.find('name', 'mod-logs');
    if(!logs) {
        console.log('The logs channel does not exist');
    }

    const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());

    const embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(`${guild.name} - LOGS`)
        .setDescription(`Ban Command used by **${entry.executor.username}** to **${entry.target.username}** with reason **${entry.reason}**`)
        .setFooter(client.footer);
    logs.send(embed);
};