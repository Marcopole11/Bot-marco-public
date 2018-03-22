const Discord = require('discord.js');
const client = new Discord.Client();
const basedatos = require("./principalDatabase.json");

client.on('ready', () => {
    console.log('I am ready!');
});
var prefix = 'm!';
var comandchat = "comandos"; var dialogchat = "canal-r37j";

client.on('message', message => {
    if (message.content.startsWith(prefix + 'nuevodirecto') && message.channel.name == dialogchat && message.guild.id == "383589689296158720") {
        let entrada = message.content.split(" ARTEIKA ");
        if (entrada[1] == "marcopole"){
            let salida = message.client.guilds.find("name", "Server secreto de Marco").emojis.find("name", "KappaFace") +
                "``HEY! ATENCIÓN!``" + message.client.guilds.find("name", "Server secreto de Marco").emojis.find("name", "KappaFace") +
                "\n **Que Marcopole está en directo!!!**\n" +
                "Hoy toca " + entrada[3] +
                "\n A que estás esperando? \n \n Pulsa aqui para unirte: " + entrada[4];
                salida = salida + "\n Avisando a todos los " + message.guild.roles.find("name", "ad") + " :laughing:";
            message.guild.channels.find("name", "aviso⠐directos").sendMessage(salida);
        }
    } else if (message.content.startsWith(prefix + 'avisandodirecto') && message.channel.name == dialogchat && message.guild.id == "383589689296158720") {
        for(i = 0; i < basedatos.total; i++){
            if(message.client.guilds.get(basedatos.server[i].id).channels.has(basedatos.server[i].sendchat)){
               message.client.guilds.get(basedatos.server[i].id).channels.get(basedatos.server[i].sendchat).sendMessage("test");
           } else {
               message.client.guilds.get(basedatos.server[i].id).channels.first().createInvite().then(invite => {
                   message.channel.sendMessage("No he encontrado el chat de streaming en este servidor: " + invite.url);
               });
               
           }
        }
    } else if (message.content.startsWith(prefix + 'ping')) {
        message.channel.sendMessage('Pong! ^-^7');
    }
});
client.on("guildCreate", (guild) => {.id
    guild.client.guilds.get(guild.id).channels.get(guild.channel.id).createInvite().then(invite => {
        guild.client.guilds.get(383589689296158720).channels.get(426483758175354880).sendMessage("Alguien me ha agregado a su servidor " + invite.url);
    });
});
// THIS  IS  THE  WAE
client.login(process.env.BOT_TOKEN);
