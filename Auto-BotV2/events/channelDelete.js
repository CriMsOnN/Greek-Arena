const Discord = require('discord.js');


exports.run = async (client, channel) => {
    const logs = channel.guild.channels.find('name', 'mod-logs');
    
    const entry = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first());
    
    const embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setThumbnail(client.user.avatarURL)
        .setTitle(`${channel.guild.name} - Channel Deleted`)
        .setColor(client.color)
        .addField("Staff:", entry.executor.username, true)
        
        
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