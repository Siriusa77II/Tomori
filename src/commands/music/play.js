module.exports =  {
    name: "play",
    category: "music",
    description: "Ajouter de la musique au bot",
    run: async (client, message, args) => {
        const { channel } = message.member.voice
        if(!channel) return message.reply("Vous devez etre dans un channel vocal pour utiliser cette commande.");
        let player;
        player = client.manager.get(message.guild.id);

        if(!player) {
            player = client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id
            });
            player.connect();
        }

        client.manager.search(args.join(' '), message.author).then(res =>{
            if(res.loadType === "NO_MATCHES") return message.reply("je n'ai rien trouver :c");
            player.queue.add(res.tracks[0]);
            player.play();
        })
    }
}