//Library imports
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const {token} = require('./config.json');

const soundboard = ["cbt", "boi", "cringingme", "earrape", "evan", "everyword", "fam", "getout", "hacking", "idk", "instruments", "kys", "mom", "nsfw", "portal2", "smiling", "spam", "sparticus", "trigger", "water", "wetalked"];
const commands = ["play", "display", "sounds", "addrole", "leave", "ts", "help"];

try {
  client.login(token);
  console.log('Ready');
} catch {
  console.log('Failed');
}

function generateUrl(filename) {
  let url = (filename === 'cbt') ? 'https://upload.wikimedia.org/wikipedia/commons/0/06/CocknBallTorture2.oga' : `http://skylerspaeth.com/jon_sbd/clips/${filename}.m4a`;
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
      console.log('Invalid command issued');
      message.reply(` ${command} is an invalid command.`);
    }

    switch (command) {
      case 'play':
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
          var currentChannel = message.member.voice.channel;
          const connection = await currentChannel.join();
          connection.play(generateUrl(arg1));
        } else {
          message.reply('You need to join a voice channel first!');
        }
        break;
        
      case 'sounds':
        message.reply(`Available soundboard options are: ${soundboard.join(', ')}`);
        break;
      
      case 'addrole':
        message.guild.roles.create({
          data: {
            name: arg1,
            color: arg2 
          }, reason: 'Command addrole executed'
        }).then(console.log).catch(console.error);
        break;

      case 'ts':
        if (message.member.roles.cache.some(r => r.name === 'TalkingStickController')) {
          if (message.member.voice.channel) {
            let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
            for (const [memberID, member] of channel.members) {
              if (member != message.member)
                member.voice.setMute(true);
            }
          } else {
            message.reply('You need to join a voice channel first!');
          }
        } else {
          message.reply('You do not have permission to do this.');
        } 
        break;

      case 'leave':
        connection = await message.member.voice.channel.leave();
        break;

      case 'display':
        if (arg1 === "avatar") {
          // Send the user's avatar URL
          message.reply(message.author.displayAvatarURL());
        }
        break;
        
      case 'help':
        message.author.send(`This is a placeholder for help, ${message.author.username}.`);
        break;
      
      case 'tsl':
        if (message.member.roles.cache.some(r => r.name === 'TalkingStickController')) {
          if (message.member.voice.channel) {
            let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
            for (const [memberID, member] of channel.members) {
              member.voice.setMute(false);
            }
          }
        }
        break;

      default:
        break;
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


/* how to mute people
client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {

     // User Joins a voice channel

  } else if(newUserChannel === undefined){

    // User leaves a voice channel

  }
})


//connected_members

if (message.member.permissions.missing('ADMINISTRATOR')) return;

const channels = message.guild.channels.filter(c => c.parentID === '497908108803440653' && c.type === 'voice');

for (const [channelID, channel] of channels) {
  for (const [memberID, member] of channel.members) {
    member.setVoiceChannel('497910775512563742')
      .then(() => console.log(`Moved ${member.user.tag}.`))
      .catch(console.error);
  }
}
*/


/*To Do
        Incorporate permissions in roles: In Progress
        Set master role for moderators to override the bot's muting, as well as who has the talking stick
        For each iterate mute active voice channel except for message.author
        Allow the original message.author pass the Talking role to another member of the current voice channel
        Auto add and remove roles as users join and leave the applied voice channel
        Record Audio
        Allow users to set marks in the audio with a command, and allow custom names on these markings
        Play YouTube URLs
        Delete most messages sent by bot after 10 seconds
<<<<<<< HEAD
        Allow Admins to administer the TSC role 
=======
>>>>>>> bd525357ba53a9eb02ebecfb922945e05f150585
*/