const Discord = require('discord.js');

exports.run = async (client, guild, user) => {
    const logs = guild.channels.find('name', 'mod-logs');
    if(!logs) {
        console.log('The logs channel does not exist');
    }

    const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
    if(entry.executor.username === client.otherbot) {
        return;
    } else {
        const embed = new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setTitle(`${guild.name} - Ban Added`)
            .setColor(client.color)
            .addField("Staff", entry.executor.username, true)
            .addField("User", entry.target.username, true)
            .addField("Reason", entry.reason, true)
            
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
};