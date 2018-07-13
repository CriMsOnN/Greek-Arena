const ms = require('ms');


exports.run = (client, message, args) => {
    if(!client.lockit) client.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock'];
    if(!time) return message.reply('You must set a duration for the lockdown in either hour(s), minute(s) or second(s)');
    
    if(validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        })
        .then(() => {
            message.channel.send('@everyone Lockdown lifted.');
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        })
        .catch(error => {
            console.log(error);
        })
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        })
        .then(() => {
            message.channel.send(`@everyone Channel locked down for ${ms(ms(time), {long: true})}`)
                .then(() => {
                    client.lockit[message.channel.id] = setTimeout(() => {
                        message.channel.overwritePermissions(message.guild.id, {
                            SEND_MESSAGES: null
                        })
                        .then(message.channel.send(`@everyone Lockdown lifted.`))
                        .catch(console.error);
                    delete client.lockit[message.channel.id];
                    }, ms(time));
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "lockdown",
    description: "Lockdowns a channel ",
    usage: "lockdown"
}