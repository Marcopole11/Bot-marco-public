const Discord = require('discord.js');
const client = new Discord.Client();
const basedatos = require("./principalDatabase.json");
const fs = require("fs");
let anadidos = JSON.parse(fs.readFileSync("./newservers.json", "utf8"));
var prefix = 'm!';

const autorole = require("./autoroles.json");
client.on('message', message => {
    /*let archat = autorole.roles.filter(er => er.chat == message.channel.id);
    if (archat.length == 1){
        message.channel.send("its okay");
    } else if (archat.length > 1){
        let errcoiciden = "**Error, se ha usado 2 veces la id de un chat en el autorole:**\n";
        archat.forEach(function(responsable) {
            errcoiciden = errcoiciden + responsable.name + "\n";
        });
        message.guild.channels.get(autorole.logchat).send(errcoiciden);
    }
    */
});

client.on('ready', () => {
    console.log('I am ready!');
});

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
                if(message.client.guilds.has(basedatos.server[i].id)){
                    if(basedatos.server[i].sendchat == "ninguno"){
                        message.client.guilds.get(basedatos.server[i].id).channels.filter(c => c.permissionsFor(message.client.guilds.get(basedatos.server[i].id).me).has('SEND_MESSAGES') && c.type === 'text').first().sendMessage(salida);
                    } else if(message.client.guilds.get(basedatos.server[i].id).channels.has(basedatos.server[i].sendchat)){
                        message.client.guilds.get(basedatos.server[i].id).channels.get(basedatos.server[i].sendchat).sendMessage(salida);
                    } else {
                        message.client.guilds.get(basedatos.server[i].id).channels.first().createInvite().then(invite => {
                            message.channel.sendMessage("No he encontrado el chat de streaming en este servidor: " + invite.url);
                        });
                    }
                } else {
                    message.channel.sendMessage(basedatos.server[i].name + " ya no se encuentra en mi lista.");
                }
            }
        }
    } else if (message.content.startsWith(prefix + 'avisandodirecto') && message.channel.name == dialogchat && message.guild.id == "383589689296158720") {
        for(i = 0; i < basedatos.total; i++){
            if(message.client.guilds.has(basedatos.server[i].id)){
                if(basedatos.server[i].sendchat == "ninguno"){
                    message.client.guilds.get(basedatos.server[i].id).channels.filter(c => c.permissionsFor(message.client.guilds.get(basedatos.server[i].id).me).has('SEND_MESSAGES') && c.type === 'text').first().sendMessage("test");
                } else if(message.client.guilds.get(basedatos.server[i].id).channels.has(basedatos.server[i].sendchat)){
                    message.client.guilds.get(basedatos.server[i].id).channels.get(basedatos.server[i].sendchat).sendMessage("test");
                } else {
                    message.client.guilds.get(basedatos.server[i].id).channels.first().createInvite().then(invite => {
                        message.channel.sendMessage("No he encontrado el chat de streaming en este servidor: " + invite.url);
                    });
                }
            } else {
                message.channel.sendMessage(basedatos.server[i].name + " ya no se encuentra en mi lista.");
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
        let kuzma = "```Haxe\n//Me han añadido en " + message.client.guilds.size + " servidores: \n";
        if(message.author.id == "192007091169263616"){
            message.client.guilds.forEach(function(value, key) {
                if(basedatos.server.some(item => item.id === key)){
                    kuzma = kuzma + ";in; ";
                } else {
                    kuzma = kuzma + ":no: ";
                }
              kuzma = kuzma + key + " " + value.name +"\n";
            });
        } else {
            message.client.guilds.forEach(function(value, key) {
                kuzma = kuzma + " " + value.name;
                    if(message.guild.id == key){
                        kuzma = kuzma + " this \n";
                    } else {
                        kuzma = kuzma + "\n";
                    }
            });
        }
        kuzma = kuzma + "```";
        message.channel.sendMessage(kuzma);
    } else if (message.content.startsWith(prefix + 'chatlist')) {
        let entrada = message.content.split(" ");
        let kuzma = "ERROR";
        if(message.client.guilds.has(entrada[1])){
            kuzma = "```Ini\n [Lista de chats de " + message.client.guilds.get(entrada[1]).name + "]\n";
            message.client.guilds.get(entrada[1]).channels.filter(c => c.type === 'text').forEach(function(value, key) {
                kuzma = kuzma + value.name;
                if(value.permissionsFor(value.guild.me).has('SEND_MESSAGES')){
                    kuzma = kuzma + " =";
                    if(value.permissionsFor(value.guild.me).has('EMBED_LINKS')){
                        kuzma = kuzma +'"'+key+'"\n';
                    } else {
                        kuzma = kuzma +'${'+key+'}\n';
                    }
                } else {
                    kuzma = kuzma +'<'+key+'>\n';
                }
            });
            kuzma = kuzma + "```";
        } else {
            kuzma = "no he encontrado ningún servidor con la ID "+ entrada[1];
        }
        message.channel.sendMessage(kuzma);
    } else if (message.content.startsWith(prefix + 'talklist')) {
        let entrada = message.content.split(" ");
        let kuzma = "ERROR";
        if(message.client.guilds.has(entrada[1])){
            kuzma = "```Ini\n [Lista de chats para hablar en " + message.client.guilds.get(entrada[1]).name + "]\n";
            message.client.guilds.get(entrada[1]).channels.filter(c =>
                                              c.type === 'text' &&
                                              c.permissionsFor(c.guild.me).has('SEND_MESSAGES') &&
                                              c.permissionsFor(c.guild.me).has('READ_MESSAGES')).forEach(function(value, key) {
                kuzma = kuzma + value.name;
                if(value.permissionsFor(value.guild.me).has('SEND_MESSAGES')){
                    kuzma = kuzma + " =";
                    if(value.permissionsFor(value.guild.me).has('EMBED_LINKS')){
                        kuzma = kuzma +'"'+key+'"\n';
                    } else {
                        kuzma = kuzma +'${'+key+'}\n';
                    }
                } else {
                    kuzma = kuzma +'<'+key+'>\n';
                }
            });
            kuzma = kuzma + "```";
        } else {
            kuzma = "no he encontrado ningún servidor con la ID "+ entrada[1];
        }
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
