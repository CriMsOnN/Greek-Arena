const Discord = require('discord.js');

exports.run = async(client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(`${message.guild.name} - Recent Kicks`);


    let removals = client.db.get(`userRemovals_${message.guild.id}`) || [];
    let kicks = removals.filter(r => r.type === 'guildMemberKick');
    let msg = '';

    if (!kicks || kicks.length === 0) {
        embed.setDescription('**No Recent Deletions..**')
             .setFooter(client.footer);

        return message.channel.send(embed);
    }

    kicks = kicks.slice(-20).reverse();


    for (var i in kicks) msg += `**${client.users.get(kicks[i].executor.id) || kicks[i].executor.tag}** *kicked* **${kicks[i].target.tag}**\n`
    embed.setDescription(msg)
    embed.setFooter(`${kicks.length} Most Recent * ${client.footer}`);

    message.channel.send(embed);
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "kicks",
    description: "Recent kicks",
    usage: "kicks"
}