const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const modlog = message.guild.channels.find('name', 'mod-logs');
    const scrims = message.guild.channels.find('name', 'scrims-signup');
    const general = message.guild.channels.find('name', 'general');
    const admin_channel = message.guild.channels.find('name', 'admin_channel');
    
    if(message.channel.name != admin_channel.name) return;
    if(client.scrims === 'Closed') {
        let scrim_details = client.db.get('scrimDetails');
        client.scrims = 'Opened';
        general.send(`@everyone Scrims are open. Captains go to #scrims-signup and type !add Team_Name to enter the scrims`);
        
        let data = {
            details: {
                name: args[0],
                password: args[1]
            }
        }
        
        if(client.db.has(`scrimDetails`)) client.db.push(`scrimDetails`, data);
        else client.db.set(`scrimDetails`, [data])
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
}

exports.help = {
    name: "start",
    description: "Start scrims",
    usage: "start"
}