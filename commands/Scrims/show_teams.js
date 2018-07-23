const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./sqlite/database.sqlite');

exports.run = async (client, message, args) => {
    let msg = '';
    getAll = sql.prepare("SELECT * FROM database");
    let allteams = getAll.all();

    const embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(`${message.guild.name} - Scrim Teams`);

    if (!allteams || allteams.length === 0) {
        embed.setDescription('**No teams yet..**')
            .setFooter(client.footer)
        return message.channel.send(embed);
    }

    allteams.forEach(items => {
        msg += `Team Name: ** ${items.teamname} ** | Captain: ${items.captain} \n\n`
    })
    embed.setDescription(msg)
        .setFooter(`${allteams.length} Teams * ${client.footer}`)
    message.channel.send(embed);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
}

exports.help = {
    name: "show_teams",
    description: "Adds a team to scrims",
    usage: "show_teams"
}