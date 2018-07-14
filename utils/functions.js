const Discord = require('discord.js');


module.exports = {
    start: function(client, captain_id, details_name, details_password) {
        client.users.get(captain_id).send(`**${details.name}** - **${details.password}**`);
    }
}