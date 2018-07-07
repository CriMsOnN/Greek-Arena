const Discord = require('discord.js');

exports.run = async(client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(`${message.guild.name} - Information`)
        .setDescription('**Invite URL: \nhttps://discordapp.com/api/oauth2/authorize?client_id=461527379009994752&permissions=8&scope=bot**')
        .setFooter(client.footer);

    message.channel.send(embed);
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "info",
    description: "Invite link for the bot",
    usage: "info"
}