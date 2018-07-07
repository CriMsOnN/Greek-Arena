const Discord = require('discord.js');


exports.run = async(client, message, args) => {
    let teams = client.db.get('scrimTeam') || [];
    let msg = '';

    const embed = new Discord.RichEmbed();
        if(!teams || teams.length === 0) {
            embed.setColor(client.color)
                .setTitle(`${message.guild.name} - Delete Teams`)
                .setDescription(`**No teams on my database**`)
                .setFooter(client.footer)
            return message.channel.send(embed);
        }
    
        client.db.delete('scrimTeam', true);

    embed.setDescription(`${teams.length} Teams deleted`)
        .setFooter(client.footer);
    message.channel.send(embed);


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "delete_teams",
    description: "Delete all teams",
    usage: "delete_teams"
}