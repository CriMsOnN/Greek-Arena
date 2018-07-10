const Discord = require('discord.js');


exports.run = (client, message, args) => {
    const modlog = message.guild.channels.find('name', 'mod-logs');
    let teamExists = client.db.get('scrimTeam');
    let scrim_details = client.db.get('scrimDetails');
    let member_name = message.author.username;
    let member_id = message.author.id;
    let gameFull = false;
    let checkTeam;
    if(client.scrims === 'Closed') return message.reply(`Scrims are closed for now!`);
    if(teamExists && teamExists.length === 2) {
        gameFull = true;
        message.reply('Scrims are full!');
    }
    if(gameFull == true) {
        for (var i in teamExists) {
            i = 0;
            client.users.get(teamExists[i].team.captain_id).send(`**${scrim_details[i].details.name}** - **${scrim_details[i].details.password}**`);
            client.scrims = 'Closed';
            client.db.delete('scrimDetails', true);
            client.db.delete('scrimTeam', true);
            
        }
        return;
    }
    for (var i in teamExists) {
        if (teamExists[i].team.team_name === args[0]) {
            checkTeam = 'Exists';
        }
    }
    if(checkTeam == 'Exists') return message.channel.send(`Your team is already registered to scrims`);
    if(args.length == 0 || args.length < 1) return message.channel.send(`Command usage: !add_team team `);
    let data = {
        team: {
            team_name: args[0],
            captain: member_name,
            captain_id: member_id
        }
    }
    if (client.db.has(`scrimTeam`)) client.db.push(`scrimTeam`, data);
    else client.db.set(`scrimTeam`, [data])
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