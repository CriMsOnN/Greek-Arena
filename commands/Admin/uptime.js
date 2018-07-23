const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let channel = message.guild.channels.find('name', 'admins_channel');
    var now = Date.now();
		var msec = now - client.startTime;
		client.logger.log("Uptime is " + msec + " milliseconds");
		var days = Math.floor(msec / 1000 / 60 / 60 / 24);
		msec -= days * 1000 * 60 * 60 * 24;
		var hours = Math.floor(msec / 1000 / 60 / 60);
		msec -= hours * 1000 * 60 * 60;
		var mins = Math.floor(msec / 1000 / 60);
		msec -= mins * 1000 * 60;
		var secs = Math.floor(msec / 1000);
		var timestr = "";
		if(days > 0) {
			timestr += days + " days ";
		}
		if(hours > 0) {
			timestr += hours + " hours ";
		}
		if(mins > 0) {
			timestr += mins + " minutes ";
		}
		if(secs > 0) {
			timestr += secs + " seconds ";
		}
        message.channel.send("**Uptime**: " + timestr);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
}

exports.help = {
    name: "uptime",
    description: "Shows the bot uptime",
    usage: "uptime"
}