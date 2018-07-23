const util = require("util");
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(message.author.id !== '120591093950709760') return;
    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }
      let argresult = args.join(' ');
      if (message.author.id !==  '120591093950709760') {
       message.channel.send('You Don\'t Have Permissions To Use This Command !');
       return; 
     }
     if (!argresult) {
       return message.channel.send("Please Specify a Code To Run!");
     }

     try {

       var evaled = eval(argresult);

       if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
      if (evaled.includes(client.token)) {
         console.log(`\n${message.author.username}#${message.author.discriminator} Try To Get The Bot Token On ${message.guild.name} (ServerID: ${message.guild.id}).\n`)
         return message.channel.send("", {
          embed: {
             color: 0xFF5733,
             title: ':exclamation::exclamation: No :exclamation::exclamation:',
             description: `No Token For You!`
          }
         });
       }

       let embed = new Discord.RichEmbed()
       .addField(`${client.user.username} - JavaScript Eval Success:`, `** **`)
       .addField(":inbox_tray: **INPUT**", "```" + args.join(" ") + "```")
       .addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```")
       .setColor(0xFF5733)
       .setFooter(message.createdAt, message.author.avatarURL)
       message.channel.send({embed})

     } catch (err){

       message.channel.send(new Discord.RichEmbed()
       .addField(`${client.user.username} - JavaScript Eval Error:`, "There Was a Problem With The Code That You Are Trying To Run!")
       .addField(":no_entry: ERROR", "```" + clean(err) + "```")
       .setColor(0xFF5733)
       .setFooter(message.createdAt, message.author.avatarURL))
       
           .catch( error => message.channel.send(`**ERROR:** ${error.message}`))
     }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "eval",
    description: "Clear messages",
    usage: "eval"
}