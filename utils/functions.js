const Discord = require('discord.js');


module.exports = {
    fetchLastAudit: async function(guild, type) {
        const getInfo = new Promise((resolve, error) => {
            setTimeout(function() {
                if (type) {
                    guild.fetchAuditLogs({limit: 1, type: type}).then(item => {
                        resolve(item.entries.first())
                    }).catch(e => {
                        client.logger.log(`Invalid permissions in ${guild.name}`);
                        return false;
                    })
                } else {
                    guild.fetchAuditLogs({limit: 1}).then(item => {
                        resolve(item.entries.first())
                    }).catch(e => {
                        client.logger.log(`Invalid permissions in ${guild.name}`)
                        return false;
                    })
                }
            }, 500)
        });
        return getInfo;
    }
}