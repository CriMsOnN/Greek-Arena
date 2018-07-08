const Discord = require('discord.js');

exports.run = async (client, member) => {
    const logs = member.guild.channels.find('name', 'mod-logs');

    let guild = member.guild;

    guild.fetchAuditLogs().then((audit) => {
        let audits = audit.entries.first();
        if(audits.target.id === member.id) {
            if(audits.action === 'MEMBER_KICK') {
                const embed = new Discord.RichEmbed()
                    .setColor(client.color)
                    .setTitle(`${guild.name} - LOGS`)
                if(audits.reason) {
                    embed.setDescription(`**${audits.target.username}** was kicked by **${audits.executor.username}** with reason **${audits.reason}**`);
                }
                else {
                    embed.setDescription(`**${audits.target.username}** was kicked by **${audits.executor.username}** without reason`);
                }

                logs.send(embed);
            }
        }
    })
}