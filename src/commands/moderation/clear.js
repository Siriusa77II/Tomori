module.exports = {
    name: "clear",
    category: "moderation",
    description: "supprimer pleins de message d'un coups. swag",
    run: async (client, message, args) =>{
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        let amount;
        if(parseInt(args[0]) > 100){
            amount = 100;
        }else{
            amount = args[0]
        }
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("Je n'ai pas la permission pour manager les messages.");
        if(isNaN(amount)) return message.reply("Merci d'entrer un chiffre Exemple `!clear 100`");

        message.channel.bulkDelete(amount, true)
        .then(deleted => message.channel.send(`J'ai supprimer ${deleted.size} messages.`)).then(m => m.delete({timeout: 5000}))
        .catch(error => {
            console.log(error)
            return message.channel.send("Une erreur est survenue." + error.message);
        });
    }
}