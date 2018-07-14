const Discord = require('discord.js');


module.exports = {
    start: function(client, captain_id, details_name, details_password) {
        client.users.get(captain_id).send(`**${details.name}** - **${details.password}**`);
    },

    getFormattedDate: function(today) {
        var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        var day  = week[today.getDay()];
        var dd   = today.getDate();
        var mm   = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var minu = today.getMinutes();

        if(dd<10)  { dd='0'+dd } 
        if(mm<10)  { mm='0'+mm } 
        if(minu<10){ minu='0'+minu } 

        return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hour+':'+minu;
    }
}