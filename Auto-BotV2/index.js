const Discord = require('discord.js');
const client = new Discord.Client();
const readdir = require('fs').readdir;


client.config = require('./config.json');
client.prefix = client.config.prefix;
client.ownerID = client.config.ownerID;
client.color = 0xDFE0D2;
client.footer = 'Created by Cr1MsOn | PUBG EXP. Greece';
client.events = new Discord.Collection();

readdir('./events/', (err, files) => {
    if (err) throw err;
    console.log(`Loading ${files.length} events!`);
    files.forEach(file => {
        client.events.set(file.substring(0, file.length - 3), require(`./events/${file}`));
        client.on(file.split('.')[0], (...args) => {
            require(`./events/${file}`).run(client, ...args);
        });
    });
    console.log(`Events loaded!`);
});

client.on('ready', async () => {
    client.user.setActivity('the server', {type: 'WATCHING'});
    console.log('Bot is up and running');
});

client.on('message', message => {
})


client.login(client.config.botToken)