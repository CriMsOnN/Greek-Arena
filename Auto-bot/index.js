const Discord = require('discord.js');
const client = new Discord.Client();


client.config = require('./config.json');
client.prefix = client.config.prefix;
client.ownerID = client.config.ownerID;
client.color = 0xDFE0D2;
client.footer = 'Created by Cr1MsON | PUBG EXP. Greece';
client.ignoreBots = true;
client.guildPings = new Map();
client.tools = require('./functions.js');

const Enmap = require('enmap');
const EnmapSQLite = require('enmap-sqlite');

client.db = new Enmap({
    provider: new EnmapSQLite({
        name: 'auto-bot'
    })
});

client.db.defer.then(() => {
    console.log(`${client.db.size} Entries Loaded`);
})

client.on('ready', async () => {
    client.user.setActivity('the server', {type: 'WATCHING'});
});

client.on('message', message => {

    if (!message.member) return;
    // Return Statements
    if (message.member.roles.find(r => r.name === 'Muted')) return;
    if(message.content.startsWith("ping")) {
        message.reply(client.ping)
    }

    // Collect Pings
    let user = {
        id: message.author.id,
        tag: message.author.tag
    };
    let pings = client.guildPings.get(message.guild.id);
    if (!pings) pings = [];
    let pinged = false;
    if (!message.member.hasPermission('ADMINISTRATOR') || !message.member.roles.find(r => r.name === 'Staff')) {
        if (message.mentions.everyone) {
            pings.push({
                target: '@everyone/@here',
                user: user,
                timestamp: Date.now()
            });
            pinged = true;
        }
        if (message.mentions.members && message.mentions.members.first()) {
            pinged = true;
            let members = message.mentions.members.array();
            for (var i in members) {
                if (members[i].user.bot || members[i].id === user.id) continue;
                else {
                    pings.push({
                        target: `@${members[i].user.username}`,
                        user: user,
                        timestamp: Date.now()
                    });
                }
            }
        }
        if (message.mentions.roles && message.mentions.roles.first()) {
            pinged = true;
            let roles = message.mentions.roles.array();
            for (var i in roles) {
                pings.push({
                    target: `@${roles[i].name}`,
                    user: user,
                    timestamp: Date.now()
                });
            }
        }
    }

    if (pinged) {
        client.guildPings.set(message.guild.id, pings);
        client.tools.checkPings(client, message.guild, message.author.id);
    }

    if (message.author.bot) return;
    

    // Variables
    let args = message.content.slice(client.prefix.length).trim().split(" "),
        cmd = args.shift().toLowerCase();

    if (cmd !== 'limits' && !args[0] && client.isNode) return;
    if (!message.content.startsWith(client.prefix)) return;

    if (cmd === 'help') cmd = 'commands';
    if (cmd === 'roledels') cmd = 'roledeletions';
    if (cmd === 'channeldels') cmd = 'channeldeletions';
    if (cmd === 'cd') cmd = 'channeldeletions';
    if (cmd === 'rd') cmd = 'roledeletions';
    if (cmd === 'invite') cmd = 'info';

    // Run Commands
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, client.tools);
    } catch (e) {
        console.log(e.stack);
    }

});

// Login
client.login(client.config.botToken);

client.on('guildBanAdd', async guild => {

    if (!guild.me.hasPermission('ADMINISTRATOR')) return;

    // Fetch audit log
    let audit = await client.tools.fetchLastAudit(guild, 'MEMBER_BAN_ADD');
    if (!audit) return;

    let target = audit.target;
    let exec = audit.executor;

    if (client.ignoreBots && target.bot) return;

    let data = {
        target: {
            id: target.id,
            tag: `@${target.username}#${target.discriminator}`
        },
        executor: {
            id: exec.id,
            tag: `@${exec.username}#${exec.discriminator}`
        },
        timestamp: Date.now(),
        type: 'guildMemberBan'
    }

    // Push To Database - Guild
    if (client.db.has(`userRemovals_${guild.id}`)) client.db.push(`userRemovals_${guild.id}`, data);
    else client.db.set(`userRemovals_${guild.id}`, [data]);

    // Push To Database - Member
    if (client.db.has(`userRemovals_${guild.id}_${exec.id}`)) client.db.push(`userRemovals_${guild.id}_${exec.id}`, data);
    else client.db.set(`userRemovals_${guild.id}_${exec.id}`, [data]);

    // Check Action Count
    client.tools.check(client, guild, exec.id, 'userRemovals');

});

client.on('guildMemberAdd', async member => {
   
})

client.on('guildMemberRemove', async member => {

    if (!member.guild.me.hasPermission('ADMINISTRATOR')) return;

    // Fetch Audit Log
    let audit = await client.tools.fetchLastAudit(member.guild, 'MEMBER_KICK');
    if (!audit) return;

    // Return if NOT kicked
    if (member.id !== audit.target.id) return;
    if (audit.action !== 'MEMBER_KICK') return;

    let target = audit.target;
    let exec = audit.executor;

    if (client.ignoreBots && target.bot) return;

    let data = {
        target: {
            id: target.id,
            tag: `@${target.username}#${target.discriminator}`
        },
        executor: {
            id: exec.id,
            tag: `@${exec.username}#${exec.discriminator}`
        },
        timestamp: Date.now(),
        type: 'guildMemberKick'
    }

    // Push To Database - Guild
    if (client.db.has(`userRemovals_${member.guild.id}`)) client.db.push(`userRemovals_${member.guild.id}`, data);
    else client.db.set(`userRemovals_${member.guild.id}`, [data]);

    // Push To Database - Member
    if (client.db.has(`userRemovals_${member.guild.id}_${exec.id}`)) client.db.push(`userRemovals_${member.guild.id}_${exec.id}`, data);
    else client.db.set(`userRemovals_${member.guild.id}_${exec.id}`, [data]);

    // Check Action Count
    client.tools.check(client, member.guild, exec.id, 'userRemovals');

});

client.on('channelDelete', async channel => {

    if (!channel.guild.me.hasPermission('ADMINISTRATOR')) return;

    // Fetch Audit Log
    let audit = await client.tools.fetchLastAudit(channel.guild, 'CHANNEL_DELETE');
    if (!audit || audit.action !== 'CHANNEL_DELETE') return;

    let exec = audit.executor;

    let data = {
        target: {
            tag: `#${channel.name}`
        },
        executor: {
            id: exec.id,
            tag: `@${exec.username}#${exec.discriminator}`
        },
        timestamp: Date.now(),
        type: 'guildChannelDelete'
    }

    // Push To Database - Guild
    if (client.db.has(`channelDeletions_${channel.guild.id}`)) client.db.push(`channelDeletions_${channel.guild.id}`, data);
    else client.db.set(`channelDeletions_${channel.guild.id}`, [data]);

    // Check Action Count
    client.tools.check(client, channel.guild, exec.id, 'channelDeletions');

})

client.on('roleDelete', async role => {

    if (!role.guild.me.hasPermission('ADMINISTRATOR')) return;

    // Fetch Audit Log
    let audit = await client.tools.fetchLastAudit(role.guild, 'ROLE_DELETE');
    if (!audit || audit.action !== 'ROLE_DELETE') return;

    let exec = audit.executor;

    let data = {
        target: {
            tag: `@${role.name}`
        },
        executor: {
            id: exec.id,
            tag: `@${exec.username}#${exec.discriminator}`
        },
        timestamp: Date.now(),
        type: 'guildRoleDelete'
    }

    // Push To Database - Guild
    if (client.db.has(`roleDeletions_${role.guild.id}`)) client.db.push(`roleDeletions_${role.guild.id}`, data);
    else client.db.set(`roleDeletions_${role.guild.id}`, [data]);

    // Check Action Count
    client.tools.check(client, role.guild, exec.id, 'roleDeletions');

})