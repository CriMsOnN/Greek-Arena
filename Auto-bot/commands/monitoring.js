const Discord = require('discord.js');

exports.run = async (client, message, args, tools) => {
  
  
  // Form Embed
  const embed = new Discord.RichEmbed()
    .setColor(client.color)
    .setTitle('Currently Monitoring')
    .setDescription(`**:arrow_up:  Pings\n:arrow_up:  Kicks\n:arrow_up:  Bans\n:arrow_up: Channel Deletions\n:arrow_up:  Role Deletions**`);
  
  message.channel.send(embed);

}