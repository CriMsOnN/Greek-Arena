const Discord = require('discord.js');
const client = new Discord.Client();
const readdir = require('fs').readdir;


client.config = require('./config.json');
client.prefix = client.config.prefix;
client.ownerID = client.config.ownerID;
client.color = 0xDFE0D2;
client.footer = 'PUBG EXP. Greece';
client.otherbot = 'GreekArenaBot';
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
    if(!message.content.startsWith(client.prefix)) return;
    let command = message.content.split(" ")[0].slice(client.prefix.length);
    let args = message.content.split(" ").slice(1);
    if(message.content.startsWith("!move")) {
        console.log(message.member.voiceChannelID);
        //if(!message.member.voiceChannel) return message.channel.send('Please connect to a voice channel.');
        //if(message.mentions.users.first().voiceChannel) return message.channel.send('Sorry, this player is already connected to a voice channel');
       // message.member.setVoiceChannel()
        let member = message.mentions.users.first().voiceChannel;
        console.log(member);
        //message.member.setVoiceChannel(member);



    }
})


client.login(client.config.botToken)