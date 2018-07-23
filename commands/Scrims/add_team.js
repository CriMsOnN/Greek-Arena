const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./sqlite/database.sqlite');

exports.run = async (client, message, args) => {
    const modlog = message.guild.channels.find('name', 'mod-logs');
    const signups = message.guild.channels.find('name', 'scrims-signup');
    let member_name = message.author.username;
    let member_id = message.author.id;
    let teamName = args.slice(0).join(" ");
    getTeam = sql.prepare("SELECT * FROM database WHERE teamname = ? AND captain = ?");
    setTeam = sql.prepare("INSERT INTO database (teamname, captain, captain_id) VALUES (@teamname, @captain, @captain_id);");
    getAll = sql.prepare("SELECT * FROM database");
    let user = getTeam.get(teamName, member_name);
    let allTeams = getAll.all();
    let captainExists = false;
    if(message.channel.name != signups.name) {
        return message.reply('You can only use this command on #scrims-signup').then(m=>m.delete(2000));
    }
    if(client.scrims === 'Closed') return message.reply(`Scrims are closed for now!`);
    for(var i in allTeams) {
        if(allTeams[i].captain === member_name) {
            captainExists = true;
        }
    }
    if(captainExists === true) {
        return message.reply('You have already registered to scrims');
    }
    if(!user) {
        user = {
            teamname: teamName,
            captain: member_name,
            captain_id: member_id
        }
        setTeam.run(user);
        message.reply(`Your team ( **${teamName}** ) successfully registered to scrims!`);
    } 

    if(args.length == 0) return message.reply('Command usage: !add team name');
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