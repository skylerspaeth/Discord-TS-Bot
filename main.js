//Library imports
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const {token} = require('./config.json');
console.log(token);

const soundbytes = ["boi", "cringingme", "earrape", "evan", "everyword", "fam", "getout", "hacking", "idk", "instruments", "kys", "mom", "nsfw", "portal2", "smiling", "spam", "sparticus", "trigger", "water", "wetalked"];


try {
        client.login(token);
        console.log('Ready');
} catch {
        console.log('Failed');
}

function generateUrl(filename) {
	let url = `http://skylerspaeth.com/jon_sbd/clips/${filename}.m4a`;
	return url;
}

client.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild, then ignore
  
  if (!message.guild) return;

  let command = message.content.split(' ')[0];
  let param = message.content.split(' ')[1];

  if (command === '//play') {
    console.log(`${chalk.blue(message.content)} command issued by ${chalk.yellow(message.author.username)}`);

    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
                var currentChannel = message.member.voice.channel;
                const connection = await currentChannel.join();
                connection.play(generateUrl(param));
                //var connection = await message.member.voice.channel.leave();

    } else {
      message.reply('You need to join a voice channel first!');
    }
  } else if (command === '//sounds') {
    console.log(`${chalk.green(message.content)} command issued by ${chalk.yellow(message.author.username)}`);
    message.reply(`Available soundbytes are: ${soundbytes.join(', ')}`);
  } else if (command === '//addrole') {
    message.guild.roles.create({
      data: { name: param, color: 'purple' }, reason: 'Command addrole executed'
    })
      .then(console.log).catch(console.error); 
  } 

});



// Pseudo code

        // if (!(Guild.hasRole("TS Controller"))) {
        //      Guild.createRole("TS Controller");
        //      Guild.createRole("TS Holder");
        //      Guild.createRole("TS Muted");
        // }
