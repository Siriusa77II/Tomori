const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "whois",
    category: "moderation",
    description: "retourne les infos sur l'utilisateur",
    run: async (client, message, args) =>{
        const member = message.mentions.members.first() || message.member;
        const roles = member.roles.cache
        .sort((a,b) => b.position - a.position)
        .map(role => role.toString());
        // .slice(0, -1));

        const embed = new MessageEmbed()
        .setAuthor(`Info pour ${member.user.username}`, message.author.displayAvatarURL())
        .setDescription(`Voici les infos pour l'utilisateur ${member}`)
        .addField('Utilisateur', [
            `**» Nom d'utilisateur** ${member.user.username} (${member.user.id})`,
            `**» Pseudo** ${member.user.nickname ? member.user.nickname : "Nope." }`,
            `**» Serveur rejoin** ${moment(member.joinedAt).format("LL, LTS")} (${moment(member.joinedAt).fromNow()})`,
            `**» Compte Cree** ${moment(member.user.createdTimestamp).format("LL, LTS")} (${moment(member.user.createdTimestamp).fromNow()})`,
            `**» Avatar** [Avatar](${member.user.displayAvatarURL({size: 4096, dynamic: true, format: 'png'})})`,
            `**» Discriminator** ${member.user.username}#${member.user.discriminator}`
        ])
        .addField("Roles:", [
            `**» Role Principale:** ${member.roles.highest.id === message.guild.id ? "Nope" : member.roles.highest} `,
            `**» Role Hoist:** ${member.roles.hoist ? member.roles.hoist : "Nope"}`,
            `**» Roles:** [${roles.length}]: ${roles.join(", ")}`
        ])
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}