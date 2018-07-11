const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const general = message.guild.channels.find('name', 'general');
    const admin_channel = message.guild.channels.find('name', 'admin_channel');
    
    if(message.channel.name != admin_channel.name) return;
    
    if(client.scrims === 'Opened') {
        general.send(`@everyone Scrims stopped!`);
        client.scrims = 'Closed';
        
        await client.db.delete('scrimTeam', true);
        await client.db.delete('scrimTeam', true);
        return;
    }
    else {
        message.reply('You have nothing to stop. Scrims are closed!');
        return;
    }
} 


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
}


exports.help = {
    name: "stop",
    description: "Stop the scrim",
    usage: "stop"
}