const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    category: "info",
    description: "Vous aide sur les commandes disponible sur le bot.",
    run: async (client, message, args) =>{
        // !help
        // => Sort toutes les commandes du bot.
        // !help [args]
        // => renvoyer des infos a propos d'une commande precise

        if(args[0]){
            return getCMD()
        }else{
            return getAll()
        }

        function getAll(){
            const embed = new MessageEmbed()
            .setColor("RANDOM")
            const commands = (category) =>{
                return client.Commands
                .filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``)
                .join(", ")
            }
            const category = client.Categories
            .map(cat => `** ${cat[0].toUpperCase() + cat.slice(1)}** \n ${commands(cat)}`)
            .reduce((string, category) => string + "\n" + category);

            return message.channel.send(embed.setDescription(category))
        }

        function getCMD(){
            const embed = new MessageEmbed()
            .setColor("RANDOM")
            const cmd = client.Commands.get(args[0]);
            let info = `Auccune information sur la commande ${args[0]} n'est disponible.`

            if(!cmd) return message.reply("Cette commande n'existe pas.")
            if(cmd.name) info = `**Nom de la commande** ${cmd.name}`
            if(cmd.description) info += `\n **Description**: ${cmd.description}`
            if(cmd.usage) info += `\n **Utilisation:** !${cmd.name} ${cmd.usage}`

            return message.channel.send(embed.setDescription(info).setFooter("Syntax: <> Requis; [] = Optionel"));
        }
    }
}