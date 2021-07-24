const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "guild",
    category: "info",
    description: "renvoie les infos sur la guild actuel.",
    run: async (client, message, args) =>{
        const channels = message.guild.channels.cache;
        const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name}'s Guilds Info`, message.author.displayAvatarURL())
        .setDescription(`Toutes les infos sur la guild ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL())
        .addField("Information", [
            `**» Nom:** ${message.guild.name}`,
            `**» ID:** ${message.guild.id}`, 
            `**» Icon:** [Liens icon](${message.guild.iconURL()})`,
            `**» region:** ${message.guild.region}`,
            `**» Proprietaire:** <@${message.guild.ownerID}>`,
            `**» Member Max:** ${message.guild.maximumMembers}`
        ], true)
        .addField("Statistiques", [
            `**» Roles:** ${message.guild.roles.cache.array().length - 1}`,
            `**» Emoji:** ${message.guild.emojis.cache.array().length}`,
            `**» Member:** ${message.guild.members.cache.array().length}`,
            `**» Channels Text:** ${channels.filter(channel => channel.type === "text").size}`,
            `**» Channel Vocale:** ${channels.filter(channel => channel.type === "voice").size}`
        ], true)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        console.log(message.guild.channels.cache)
        message.channel.send(embed);
    }   
}