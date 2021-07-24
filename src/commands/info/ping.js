module.exports = {
    name: "ping",
    category: "info",
    description: "Montre la latence entre discord et les serveues de Tomori",
    run: async (client, message, args) =>{
        message.channel.send(`🏓 ${client.ws.ping}ms`)
    }
}