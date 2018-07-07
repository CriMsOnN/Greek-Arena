const Discord = require('discord.js');


exports.run = async (client, message, args) => {
    let teams = client.db.get('scrimTeam') || [];
    let msg = '';
    const embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(`${message.guild.name} - Scrim Teams`);

    if (!teams || teams.length === 0) {
        embed.setDescription('**No teams yet..**')
            .setFooter(client.footer)
        return message.channel.send(embed);
    }


    teams.forEach(items => {
        msg += `Team Name: ** ${items.team.team_name} ** | Captain: ${items.team.captain} | Player 1: ${items.team.player1} | Player 2: ${items.team.player2} | Player 3: ${items.team.player3} \n\n`
    });
    embed.setDescription(msg)
        .setFooter(`${teams.length} Teams * ${client.footer}`)
    message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "show_teams",
    description: "Adds a team to scrims",
    usage: "show_teams"
}