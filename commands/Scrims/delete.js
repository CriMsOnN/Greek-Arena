const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./sqlite/database.sqlite');

exports.run = async (client, message, args) => {
    let teamName = args.slice(0).join(" ");
    getTeam = sql.prepare("SELECT * FROM database WHERE teamname = ?");
    deleteTeam = sql.prepare("DELETE FROM database WHERE teamname = ?");
    let user = getTeam.get(teamName);

    if(!user) {
        return message.reply(`**${teamName}** does not exists on my database`);
    }
    else {
        deleteTeam.run(teamName);
        return message.reply(`**${teamName}** successfully deleted!`);
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
}

exports.help = {
    name: "delete",
    description: "Adds a team to scrims",
    usage: "delete"
}