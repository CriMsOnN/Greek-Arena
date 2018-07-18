const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./sqlite/database.sqlite');

exports.run = async (client, message, args) => {
    const admin_channel = message.guild.channels.find('name', 'admins_channel');
    if(message.channel.name != admin_channel.name) return;
    if(client.scrims === 'Opened') {
        getAll = sql.prepare("SELECT * FROM database");
        getDetails = sql.prepare("SELECT * FROM details");
        deleteAll = sql.prepare("DELETE FROM database");
        let details = getDetails.all();
        let allTeams = getAll.all();
        for(var i in allTeams) {
            client.users.get(allTeams[i].captain_id).send(`SEVER NAME: **${details[0].name}** and PASSWORD: **${details[0].password}** `);
        }
        deleteAll.run();
        let deleteDetails = sql.prepare("DELETE FROM details");
        deleteDetails.run();
        client.scrims = 'Closed';
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "send_details",
    description: "Sends details to captains",
    usage: "send_details"
}