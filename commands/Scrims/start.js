const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./sqlite/database.sqlite');


exports.run = (client, message, args) => {
    const modlog = message.guild.channels.find('name', 'mod-logs');
    const scrims = message.guild.channels.find('name', 'scrims-signup');
    const general = message.guild.channels.find('name', 'general');
    const admin_channel = message.guild.channels.find('name', 'admins_channel');
    let connection;
    if(message.channel.name != admin_channel.name) return;
    if(client.scrims === 'Closed') {
        client.scrims = 'Opened';
        general.send(`@everyone Scrims are open. Captains go to #scrims-signup and type !add team name to enter the scrims`);
    }

    getDetails = sql.prepare("SELECT * FROM details");
    insertDetails = sql.prepare("INSERT INTO details (name, password) VALUES (@name, @password);");

    let details = getDetails.all();
    if(!details || details.length === 0) {
        connection = {
            name: args[0],
            password: args[1]
        }
        insertDetails.run(connection);
        message.reply(`Your details has been **accepted**`);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
}

exports.help = {
    name: "start",
    description: "Start scrims",
    usage: "start"
}