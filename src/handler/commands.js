const { readdirSync } = require("fs");
const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Commands", "Status");

module.exports = (client)=>{
    readdirSync("./src/commands/").forEach(dir =>{
        const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands){
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name){
                client.Commands.set(pull.name, pull)
                table.addRow(file, "OK")
            }else{
                table.addRow(file, "🙅‍♀️");
                continue;
            }
        }
    });
    console.log(table.toString());

}

// commands
//     |--- Moderation
//       |---ban.js
//       |---Kick.js
//     |--- Fun
//       |---reddit.js
//       |---rank.js
//     |--- Whatever
//       |---whatever.js