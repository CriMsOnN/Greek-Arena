const Discord = require('discord.js');


exports.run = async (client, guild, user) => {
    const logs = guild.channels.find('name', 'mod-logs');
    guild.fetchAuditLogs().then((audit) => {
        let audits = audit.entries.first();
        if (audits.target.id === user.id) {
            const embed = new Discord.RichEmbed()
                .setAuthor(client.user.username, client.user.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .setTitle(`${guild.name} - Ban Removed`)
                .setColor(client.color)
                .addField("Staff", audits.executor.username, true)
                .addField("User", audits.target.username, true)
            
            var currentDate = new Date();
            var datetime = currentDate.getDate() + "/" +
            (currentDate.getMonth() + 1) + "/" +
            currentDate.getFullYear() + " @ " +
            currentDate.getHours() + ":" +
            currentDate.getMinutes() + ":" +
            currentDate.getSeconds();
            
            embed.addField("Time", datetime, true);
            embed.setFooter(client.footer);
            
            logs.send(embed);
        }
    })
}