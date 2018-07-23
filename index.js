const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const memwatch = require('node-memwatch');
const Enmap = require('enmap');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./sqlite/database.sqlite');
client.commands = new Enmap();
client.aliases = new Enmap();
client.config = require('./config.json');
client.prefix = client.config.prefix;
client.ownerID = client.config.ownerID;
client.modlogs = client.config.modlogs;
client.embedimage = client.config.channel_image_url;
client.admin_channel = client.config.admin_channel
client.maintenance = false;
client.scrims = 'Closed';
client.color = 0xDFE0D2;
client.footer = 'PUBG Exp. Greece';
client.logger = require('./utils/Logger.js');
client.tools = require('./utils/functions.js');

memwatch.on("leak", info => {
    client.logger.log('Possible Memory Leak detected =>', info);
    client.logger.log(`Leak Detected\n Reason: ${info.reason}`);

})

client.on('ready', async () => {
    client.startTime = Date.now();
    client.user.setActivity('Scrims');
    client.user.setStatus("online");
    client.logger.log(`** Bot is up and running **`);
    client.user.setUsername('GreekArenaBot');
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'database';").get();
    if(!table['count(*)']) {
        sql.prepare("CREATE TABLE database (teamname TEXT, captain TEXT, captain_id TEXT);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }
    const table2 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'details';").get();
    if(!table2['count(*)']) {
        sql.prepare("CREATE TABLE details (name TEXT, password TEXT);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }
    
});

fs.readdir("./commands/Admin", (err, files) => {
    if (err) client.logger.log(err)
    client.logger.log(`** Loading ${files.length} Administrator Commands. **`)
    files.forEach(f => {
        let props = require(`./commands/Admin/${f}`)
        client.commands.set(props.help.name, props)
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name)
        })
    })
})

fs.readdir("./commands/Mods", (err, files) => {
    if (err) client.logger.log(err)
    client.logger.log(`** Loading ${files.length} Moderator Commands. **`)
    files.forEach(f => {
        let props = require(`./commands/Mods/${f}`)
        client.commands.set(props.help.name, props)
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name)
        })
    })
})

fs.readdir("./commands/Scrims", (err, files) => {
    if (err) client.logger.log(err)
    client.logger.log(`** Loading ${files.length} Scrim Commands. **`)
    files.forEach(f => {
        let props = require(`./commands/Scrims/${f}`)
        client.commands.set(props.help.name, props)
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name)
        })
    })
})
client.on('message', message => {
    if (!message.member) return;
    if (message.author.bot) return;
    if(client.maintenance === true && message.content.startsWith(client.prefix) && message.channel.name != message.guild.channels.find('name', 'admin_channel').name) {
        message.reply('We are performing scheduled maintenance. We should be back online shortly.\nIn oder to provide you with a better experience, we periodically perfom maintenance on the bot and server');
        return;
    }
    if (!message.content.startsWith(client.prefix)) return;
    let command = message.content.split(" ")[0].slice(client.config.prefix.length);
    let args = message.content.split(" ").slice(1);
    let perms = client.elevation(message)
    let cmd
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command))
    }
    if (cmd) {
        if (perms < cmd.conf.permLevel) {
            message.reply("You dont have access for this command").then(m => {
                m.delete(7000);
            });
            return;
        } else if (cmd.conf.enabled === true) {
            cmd.run(client, message, args, perms)
            client.logger.log(`${message.author.username} used **${client.config.prefix + command}** command`);
        } else {
            client.logger.log(`${message.author.username} tried to use **${client.config.prefix + command}** but its disabled!`);
            const embed = new Discord.RichEmbed()
                .setColor(client.color)
                .setTitle(`Command Disabled`)
                .setDescription(`**${command}** is disabled for now. Contact the developer for any questions`)
                .setFooter(client.footer);
            message.channel.send(embed);
        }
    }
})
client.on("Presence", user => {
    if(user.status == 'offline') {
        let humans = user.guild.members.filter(m => !m.user.bot).size
        user.guild.channels.get(client.config.serverStatsChannels.membercountchannelID).setName(`Online Users: ${humans}`)

    }
})

client.on('guildMemberRemove', async (member) => {
    member.guild.channels.get(client.config.serverStatsChannels.totaluserschannelID).setName(`Total Users: ${member.guild.memberCount}`)
    let humans = member.guild.members.filter(m => !m.user.bot).size
    member.guild.channels.get(client.config.serverStatsChannels.membercountchannelID).setName(`Online Users: ${humans}`)
})

client.on('guildMemberAdd', (member) => {
    member.guild.channels.get(client.config.serverStatsChannels.totaluserschannelID).setName(`Total Users: ${member.guild.memberCount}`);
    let humans = member.guild.members.filter(m => !m.user.bot).size
    member.guild.channels.get(client.config.serverStatsChannels.membercountchannelID).setName(`Online Users: ${humans}`);
})
client.reload = function (directory, command) {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${directory}/${command}`)]
            let cmd = require(`./commands/${directory}/${command}`)
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias)
            })

            client.commands.set(command, cmd)
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name)
            })
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}




client.elevation = function (message) {
    let permlvl = 0
    let moderator_role = message.guild.roles.find("name", "Moderators")
    if (moderator_role && message.member.roles.has(moderator_role.id)) permlvl = 2
    let admin_role = message.guild.roles.find("name", "HEAD ADMIN")
    if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3
    let developer_role = message.guild.roles.find("name", "DEVELOPERS")
    if(developer_role && message.member.roles.has(developer_role.id)) permlvl = 4
    if (message.author.id === client.config.ownerID) permlvl = 4
    return permlvl;
}

client.login(client.config.botToken);