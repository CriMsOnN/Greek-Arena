const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const general = message.guild.channels.find('name', 'general');
    const admin_channel = message.guild.channels.find('name', 'admin_channel');
    let teamExists = client.db.get('scrimTeam') || [];
    let scrim_details = client.db.get('scrimDetails');
    
    
    if(message.channel.name != admin_channel.name) return;
    
    if(client.scrims === 'Closed') {
        message.reply('Scrims are closed!');
        return;
    }
    if(client.scrims === 'Opened') {
        client.scrims = 'Closed';
        for (var i = 0; i < teamExists.length; i++) {
            client.users.get(teamExists[i].team.captain_id).send(`Game name: **${scrim_details[0].details.name}** Game password: **${scrim_details[0].details.password}**`);
        }
        message.channel.send('**Scrim signups closed. Game is about to begin!**').then(() => {
            client.db.delete('scrimDetails', true);
            client.db.delete('scrimTeam', true);
        })
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
    name: "force_start",
    description: "Force start the scrim",
    usage: "force_start"
}