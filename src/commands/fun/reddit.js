const axios = require("axios");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "reddit",
    category: "fun",
    description: "Affiche un post aleatoir d'un sub reddit",
    run: async (client, message, args) =>{
        if(!args[0]) return message.reply("merci de fournire un sub reddit. Exemple `!reddit creepy`");
        axios.get(`https://www.reddit.com/r/${args[0]}.json?sort=top&t=week&limit=100`)
        .then(res =>{
            const body = res.data;
            const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            if(!allowed.length) return message.reply("Auccun post disponible pour les channel non-NSFW");
            const random = Math.floor(Math.random()* allowed.length);
            const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(allowed[random].data.title)
            .setDescription(allowed[random].data.author)
            .setImage(allowed[random].data.url)
            .addField('Information:', `Up vote: ${allowed[random].data.ups} / Commentaires: ${allowed[random].data.num_comments}`)
            .setURL(`https://Reddit.com${allowed[random].data.permalink}`)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            message.channel.send(embed)
        })
        .catch(err =>{
            console.log(err)
            return message.reply(`Oops une erreur est survenue! \`\`\`${err.message}\`\`\``)
        })
    }
}