module.exports =  {
    name: "join",
    category: "music",
    description: "Fait rejoindre le bot dans voitre Voice Channel",
    run: async (client, message, args) => {
        const { channel } = message.member.voice
        if(!channel) return message.reply("Vous devez etre dans un channel vocal pour utiliser cette commande.");
        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id
        });
        player.connect();
        message.reply(`J'ai rejoin le channel vocal, et j'utilise \`${message.channel.name}\` pour comuniquer `)
    }
}