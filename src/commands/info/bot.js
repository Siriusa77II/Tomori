const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "bot",
    category: "info",
    description: "Envoie les infos du client",
    run: async (client, message, args) =>{
        const embed = new MessageEmbed()
        .setAuthor(`${client.user.username}'s Info`, message.author.displayAvatarURL())
        .setDescription(`Toutes les infos sur le bot ${client.user.username}`)
        .setThumbnail(client.user.displayAvatarURL())
        .addField("User Info", [
            `**» Nom:** ${client.user.username} (${client.user.id})`,
            `**» Nb Commands:** ${client.Commands.size}`,
            `**» Nb Guilds:** ${client.guilds.cache.size}`,
            `**» Nb Utilisateur:** ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`,
            `**» Nb Channels:** ${client.channels.cache.size.toLocaleString()}`,
            `**» Date de creation:** ${client.user.createdAt}`
        ])
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        message.reply(embed)
        /**************\
        * Usernane (ID)
        * Commands
        * Guilds
        * Users
        * Channels
        * Cr5eation
        \***************/
    }
}