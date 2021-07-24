module.exports =  {
    name: "leave",
    category: "music",
    description: "Fait quitter le bot dans voitre Voice Channel",
    run: async (client, message, args) => {
        const { channel } = message.member.voice
        if(!channel) return message.reply("Vous devez etre dans un channel vocal pour utiliser cette commande.");
        const player = client.manager.get(message.guild.id);
        if(!player) return message.reply("Je ne suis pas dans un channel actuelement.")
        player.destroy();
        message.reply(`J'ai quitter le channel.`)
    }
}