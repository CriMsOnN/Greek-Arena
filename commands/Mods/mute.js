const Discord = require('discord.js');

exports.run = async ( client, message, args) => {
    if (message.mentions.members.first()) {
        if(message.member.user.id == message.mentions.members.first().id) {
            message.channel.send(new Discord.RichEmbed()
                .setColor(client.color)
                .setTitle(`${message.guild.name} - Mute`)
                .setDescription('You cant mute yourself').then(m => {
                    m.delete(5000)
                })
            )
        } else {
            message.channel.overwritePermissions(message.mentions.members.first(), {
                SEND_MESSAGES: false
            }).then((channel) => {
                message.channel.send(new Discord.RichEmbed()
                    .setColor(client.color)
                    .setTitle(`${message.guild.name} - Mute`)
                    .setDescription(`Successfully muted: ${message.mentions.members.first().user.username}`)
                )

                if(!message.mentions.members.first().user.bot) {
                    message.mentions.members.first().send(new Discord.RichEmbed() 
                        .setColor(client.color)
                        .setTitle(`${message.guild.name} - Mute`)
                        .setDescription(`You got muted from ${message.guild.name}\nMuted By ${message.member.user.tag}`)
                    )
                }
            })
        }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
}

exports.help = {
    name: "mute",
    description: "Mute a user from the server",
    usage: "mute"
}