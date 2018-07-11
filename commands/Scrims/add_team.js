const Discord = require('discord.js');


exports.run = async (client, message, args) => {
    const modlog = message.guild.channels.find('name', 'mod-logs');
    const signups = message.guild.channels.find('name', 'scrims-signup');
    const general = message.guild.channels.find('name', 'general');
    let teamExists = client.db.get('scrimTeam') || [];
    let scrim_details = client.db.get('scrimDetails');
    let member_name = message.author.username;
    let member_id = message.author.id;
    let checkTeam;
    if(message.channel.name != signups.name) {
        message.reply('You cant use this command only on #scrims-signups').then(m => { 
            m.delete(10000); 
        });
        return;
     }
    if(client.scrims === 'Closed') return message.reply(`Scrims are closed for now!`);
    for (var i in teamExists) {
        if (teamExists[i].team.team_name === args[0]) {
            checkTeam = 'Exists';
        }
    }
    if(checkTeam == 'Exists') return message.reply(`Your team is already registered to scrims`);
    let data = {
        team: {
            team_name: args[0],
            captain: member_name,
            captain_id: member_id
        }
    }
    if (client.db.has(`scrimTeam`)) client.db.push(`scrimTeam`, data);
    else client.db.set(`scrimTeam`, [data])
    if(teamExists && teamExists.length === 4) {
        for (var i = 0; i < teamExists.length; i++) {
            client.users.get(teamExists[i].team.captain_id).send(`Game name: **${scrim_details[0].details.name}** Game password: **${scrim_details[0].details.password}**`);
        }
        general.send('**Scrim signups closed. Game is about to begin!**');
        client.scrims = 'Closed';
        client.db.delete('scrimDetails', true);
        client.db.delete('scrimTeam', true);
        return;
    }
    if(args.length == 0 || args.length < 1) return message.channel.send(`Command usage: !add_team team `);
    message.reply(`${args[0]} successfully registered for scrims!`);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "add",
    description: "Adds a team to scrims",
    usage: "add"
}