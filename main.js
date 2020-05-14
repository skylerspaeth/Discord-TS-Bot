//Library imports
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const {token} = require('./config.json');

const soundbytes = ["boi", "cringingme", "earrape", "evan", "everyword", "fam", "getout", "hacking", "idk", "instruments", "kys", "mom", "nsfw", "portal2", "smiling", "spam", "sparticus", "trigger", "water", "wetalked"];
const commands = ["play", "display", "sounds", "addrole", "leave"];

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
  var defaultPrefix = "//";
  let prefix = defaultPrefix;
  let prefixLen = prefix.length;

  if (message.content.substring(0,prefixLen) === prefix) {
    let command = message.content.split(prefix)[1].split(' ')[0];
    let arg1 = message.content.split(' ')[1];
    let arg2 = message.content.split(' ')[2];

    // Check to see if command is valid
    if (commands.includes(command)) {
      console.log(`${chalk.green(message.content)} command issued by ${chalk.yellow(message.author.username)}#${chalk.yellow(message.author.discriminator)}`);
    } else {
      console.log('Invalid command issued')
    }

    if (command === 'display' && arg1 === "avatar") {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL());
    }

    if (command === 'play') {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voice.channel) {
        var currentChannel = message.member.voice.channel;
        const connection = await currentChannel.join();
        connection.play(generateUrl(arg1));
      } else { message.reply('You need to join a voice channel first!'); }
      
    } else if (command === 'sounds') {
      message.reply(`Available soundbytes are: ${soundbytes.join(', ')}`);
    } else if (command === 'addrole') {
      message.guild.roles.create({
        data: {
          name: arg1,
          color: 'purple' 
        }, reason: 'Command addrole executed'
      })
        .then(console.log).catch(console.error); 
    } else if (command === 'ts') {
      console.log('talking stick logic goes here');
    } else if (command === 'leave') {
      connection = await message.member.voice.channel.leave();
    }
  }
});



/* Pseudo code

        if (!(Guild.hasRole("TS Controller"))) {
             Guild.createRole("TS Controller");
             Guild.createRole("TS Holder");
             Guild.createRole("TS Muted");
        }

        let prefix = "//";
        let command = message.content.split(prefix)[1]

*/ 

/*To Do
        Incorporate permissions in roles
        Set master role for moderators to override the bot's muting, as well as who has the talking stick
        For each iterate mute active voice channel except for message.author
        Allow the original message.author pass the Talking role to another member of the current voice channel
        Auto add and remove roles as users join and leave the applied voice channel
        Record Audio
        Allow users to set marks in the audio with a command, and allow custom names on these markings
        Play YouTube URLs
*/