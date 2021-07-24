const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "say",
    category: "moderation",
    description: "azi je repete frer",
    usage: "[embed] <message>",
    run: async (client, message, args) =>{
        if(!message.deletable) return message.reply("Je ne peut pas supprimer ce message.");
        message.delete();
        if(args[0] === "embed"){
            const sayEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(args.slice(1).join(" "))
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()

            message.channel.send(sayEmbed);
        }else{
            message.channel.send(args.join(" "));
        }
    }
}