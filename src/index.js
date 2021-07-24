const { Client, Collection } = require('discord.js');
const Config = require("../config.json");
const { Manager } = require('erela.js');
const fs = require("fs");

const client = new Client();

// Initiation Erela.js
client.manager = new Manager({
    nodes: [
        {
            host: Config.lavaHost,
            port: Config.lavaPort,
            password: Config.lavaPass,
        },
    ],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if(guild) guild.shard.send(payload);
    },
})
    .on("nodeConnect", node => console.log(`Lavalink: ${node.options.identifier} est connecter`))
    .on("nodeError", (node, error) => console.log(`Lavalink: ${node.options.identifier} a rencontrer une erreur: ${error.message}`))
    .on("trackStart", (player, track)=>{
        client.channels.cache.get(player.textChannel).send(`Lecture en cours: ${track.title}`)
    })
    .on("queueEnd", player =>{
        client.channels.cache.get(player.textChannel).send("Playlist terminer.")
        player.destroy();
    });

// Command Handler
client.Commands = new Collection();
client.Aliases = new Collection();
client.Categories = fs.readdirSync("./src/commands/");
["commands"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on('ready', () =>{
    console.log(`${client.user.username}: Connecter a Discord et pret.`);
    client.manager.init(client.user.id);
});

client.on("raw", (d) =>{
    client.manager.updateVoiceState(d);
})

client.on("message", message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(`${Config.prefix}`)) return;
    
    const messageArray = message.content.split(" ").toLowerCase()
    cmd = messageArray[0].slice(Config.prefix.length);
    args = messageArray.slice(1);

    let commandFile = client.Commands.get(cmd)
    if(commandFile) commandFile.run(client,message,args)
})

client.login(Config.token, console.log("Tomori: Connection a discord."));