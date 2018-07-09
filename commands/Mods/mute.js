const Discord = require('discord.js');

exports.run = async ( client, message, args) => {
    const logs = message.guild.channels.find('name', 'mod-logs');
    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention or ID!");
    if(toMute.id === message.author.id) return message.channel.send("You can not mute yourself!");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You can not mute a member that is equal to or higher than yourself!");


    let mutedRole = message.guild.roles.find(mR => mR.name === "Muted");

    if(!mutedRole) {
        try {
            mutedRole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(mutedRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            });
        } catch(e) {
            client.logger.log(e.stack);
        }
    }

    if(toMute.roles.has(mutedRole.id)) return message.channel.send("This user is already muted!");


    await toMute.addRole(mutedRole);

    const embed = new Discord.RichEmbed()
        .setTitle(`${message.guild.name} - Mute`)
        .setColor(client.color)
        .setDescription(`**${toMute}** muted by **${message.author.username}**`)
        .setFooter(client.footer)
    logs.send(embed);
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