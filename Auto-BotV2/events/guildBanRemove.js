const Discord = require('discord.js');


exports.run = async (client, guild, user) => {
    let logs = guild.channels.find('name', 'mod-logs');
    guild.fetchAuditLogs().then((audit) => {
        let audits = audit.entries.first();
        if (audits.target.id === user.id) {
            const embed = new Discord.RichEmbed()
                .setColor(client.color)
                .setTitle(`${guild.name} - LOGS`)
                .setDescription(`Ban from **${audits.target.username}** removed from **${audits.executor.username}**`);
            logs.send(embed);
        }
    })
}