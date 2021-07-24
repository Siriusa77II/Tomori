const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicker les mechant utilisateur!",
    run: async (client, message, args) =>{
        if(!message.member.hasPermission("BAN_MEMBERS")) return console.log("User dont have the permissions to ban users");
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Je n'ai pas la permissions de bannire des gens.");
        if(!args[0]) return message.reply("Merci de definire un utilisateur a bannire et une raison. `!ban @user raison.`");
        const UserKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!UserKick) return message.reply(`l'utilisateur \`${args[0]}\` est introuvable.`);
        if(UserKick.id === client.user.id) return message.reply("Je ne peut pas me bannire moi meme.");
        if(UserKick === message.author.id) return message.reply("Tu ne peut pas te bannire toi meme.");
        if(!UserKick.kickable) return message.reply("Je ne peut pas bannire cette utilisateur.");
        message.delete()
        const BanEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`${UserKick.user.username}#${UserKick.user.discriminator} A etait kicker par ${message.author}`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        message.channel.send(BanEmbed);
        UserKick.kick({reason: `${args.slice(1).join(" ")} | kicker par ${message.author.username} (${message.author.id})` })
    }
}