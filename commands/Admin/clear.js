const Discord = require('discord.js');


exports.run = async ( client, message, args ) => {
    if (isNaN(args[0])) return message.channel.send('**Please supply a valid amount of messages to purge**');
    if (args[0] > 100) return message.channel.send('**Please supply a number less than 100**');
  message.channel.bulkDelete(args[0])
    .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages**`).then(msg => msg.delete(10000)))
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
}

exports.help = {
    name: "clear",
    description: "Clear messages",
    usage: "Clear amount"
}