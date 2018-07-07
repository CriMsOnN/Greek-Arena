const Discord = require('discord.js');


exports.run = (client, message, args) => {
    const modlog = message.guild.channels.find('name', 'mod-logs');
    let teamExists = client.db.get('scrimTeam');
    let checkTeam;
    for (var i in teamExists) {
        if (teamExists[i].team.team_name === args[0]) {
            checkTeam = 'Exists';
        }
    }
    if (checkTeam == 'Exists') {
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - Scrims Register`)
            .setDescription(`This team is already registered to scrims. Type !delete_team name to leave from scrims`)
            .setFooter(client.footer);
        message.channel.send(embed);
        return false;
    }
    if (args.length == 0 || args.length < 5) {
        const embed = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - Scrims Register`)
            .setDescription(`Usage of command: !addteam Team_Name Captain player1 player2 player3 player4 player5`)
            .setFooter(client.footer);
        message.channel.send(embed);
        return false;
    }
    else {
        let data = {
            team: {
                team_name: args[0],
                captain: args[1],
                player1: args[2],
                player2: args[3],
                player3: args[4],
                player4: args[5],
                player5: args[6]
            }
        }

        if (client.db.has(`scrimTeam`)) client.db.push(`scrimTeam`, data);
        else client.db.set(`scrimTeam`, [data])
        const embed1 = new Discord.RichEmbed()
            .setColor(client.color)
            .setTitle(`${message.guild.name} - Scrims Register`)
            .setDescription(`Team **${args[0]}** successfully registered to scrims`)
            .setFooter(client.footer);

        let embed2 = new Discord.RichEmbed()
            .setColor(client.color)
            .setAuthor("PUBG EXP. Security", client.embedimage)
            .setTitle(`${message.guild.name} - Team Added`)
            .setThumbnail(client.embedimage)
            .addField('Action:', 'add_team', true)
            .addField('Team Name:', `${args[0]}`, true)
            .setFooter(client.footer);
        
        message.channel.send(embed1).then(msg => {
            client.channels.get(client.modlogs).send(embed2);
        })
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "add_team",
    description: "Adds a team to scrims",
    usage: "add_team"
}