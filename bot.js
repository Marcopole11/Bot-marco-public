const Discord = require('discord.js');
const client = new Discord.Client();
const basedatos = require("./principalDatabase.json");
const fs = require("fs");
let anadidos = JSON.parse(fs.readFileSync("./newservers.json", "utf8"));

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
            for(i = 0; i < basedatos.total; i++){
                if(message.client.guilds.get(basedatos.server[i].id).channels.has(basedatos.server[i].sendchat)){
                   message.client.guilds.get(basedatos.server[i].id).channels.get(basedatos.server[i].sendchat).sendMessage(salida);
               } else {
                   message.client.guilds.get(basedatos.server[i].id).channels.first().createInvite().then(invite => {
                       message.channel.sendMessage("No he encontrado el chat de streaming en este servidor: " + invite.url);
                   });
               }
            }
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
    } else if (message.content.startsWith(prefix + 'escribemeEsta')) {
        /*let numtot = basedatos.total;
        anadidos[numtot] = {
            "id" : "425378549432582165",
            "sendchat" : "42537996903684506"
        };
        //anadidos[total]++;
        fs.writeFile("./principalDatabase.json", JSON.stringify(anadidos), (err) => {
            if (err) console.error(err)
        });*/
        if (!anadidos[message.author.id]) anadidos[message.author.id] = {
            points: 0,
            level: 0
        };
        anadidos[message.author.id].points++;

          // And then, we save the edited file.
        fs.writeFile("./newservers.json", JSON.stringify(anadidos), (err) => {
            if (err) console.error(err)
        });
//KUZMA AREA!!!!!!!!
    } else if (message.content.startsWith(prefix + 'serverlist')) {
        let kuzma = "Me han añadido en " + message.client.guilds.length + " servidores: \n";
        message.client.guilds.forEach(function(value, key) {
          kuzma = kuzma + key + ", \n";
        });
        message.channel.sendMessage(kuzma);
    } else if (message.content.startsWith(prefix + 'serverlist')) {
        let kuzma = "Servidores: ";
        message.client.guilds.forEach(function(value, key) {
          kuzma = kuzma + key + ", ";
        });
        message.channel.sendMessage(kuzma);
    } else if (message.content.startsWith(prefix + 'ping')) {
        message.channel.sendMessage('Pong! ^-^7');
    }
});
client.on("guildCreate", guild => {
    const channelini = guild.channels.filter(c => c.type === 'text').first();
    let idc = channelini.id;
    
    client.channels.get(idc).createInvite().then(invite => {
        client.channels.get('426483758175354880').send("Alguien me ha agregado a su servidor " + invite.url);
    });
});
/*
client.on("guildCreate", guild => {
    client.guilds.get(383589689296158720).channels.get("403819522068578315").sendMessage("test")
        client.guilds.get(guild.id).channels.first().createInvite().then(invite => {
            guild.client.guilds.get(383589689296158720).channels.get(426483758175354880).sendMessage("Alguien me ha agregado a su servidor " + invite.url);
        });
  
});
/*
console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
client.on("guildCreate", (guild) => {
    guild.client.guilds.get(guild.id).channels.first().createInvite().then(invite => {
        guild.client.guilds.get(383589689296158720).channels.get(426483758175354880).sendMessage("Alguien me ha agregado a su servidor " + invite.url);
    });
});*/
// THIS  IS  THE  WAE
client.login(process.env.BOT_TOKEN);
