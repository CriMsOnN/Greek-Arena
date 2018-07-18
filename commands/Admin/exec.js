const exec = require('child_process').exec;

exports.run = async(client, message, args) => {
    if(message.author.id !== '120591093950709760') return message.channel.send("Only developers can use this command");
    exec(`${args.join(' ')}`, (error, stdout) => {
        const response = (error || stdout);
        message.channel.send(`Ran: ${args.join(" ")}\n${response}`, {code: "asciidoc", split: "\n"}).catch(console.error);
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: "exec",
    description: "Clear messages",
    usage: "exec"
}