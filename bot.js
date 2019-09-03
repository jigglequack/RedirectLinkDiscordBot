const Discord = require('discord.js');

const client = new Discord.Client();

//const fs = require('fs')

//const auth = require('./auth.json');
//var config = require('./user_data.json')
//var userRead = fs.readFileSync(userPath);
//var userFile = JSON.parse(userRead);

//var userPath = './user_data.json'



client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});

var blockedchannels = ['587909626087866390','563202381202849832']
var blockedcommands = ['!da', 'gif']
var saved_quotes = {};

client.on('message', msg => {

  const bot_channel = msg.guild.channels.find(ch => ch.name === 'bots');
  const valid_command = msg.content.split(' ').length;
  const first_word = msg.content.split(' ')[0]

  if (msg.content.includes('http') && msg.author != client.user 
    && !msg.content.includes('!da') && !msg.content.includes('gif') 
    && !blockedchannels.includes(msg.channel.id)) {
    bot_channel.send("**"+msg.author.username+"**" + " linked: " + msg.content);}

  if (first_word == '!purge' && valid_command > 1){
  	var delete_message = msg.content.substr(msg.content.indexOf(" ")+1)
  	//if(!channel) return;
  	bot_channel.send("**Cleaning up messages:** " + delete_message);
  	console.log("Purge Working")
  	msg.delete();
  	msg.channel.fetchMessages({limit: 50}).then(collected =>{
  		collected.forEach(mesg => {
  			if (mesg.content === delete_message) mesg.delete();
  		})
  	  })
  	}
 //  	var userRead = fs.readFileSync(userPath);
	// var userFile = JSON.parse(userRead);
    if (first_word == '!quote'){
      if (valid_command > 1){

    	saved_quotes[msg.author.username] = {quote: msg.content.substr(msg.content.indexOf(" ")+1)}
        //userFile[msg.author.username] = {quote: msg.content.substr(msg.content.indexOf(" ")+1)};
        //console.log(userFile[msg.author.username]);
        // fs.writeFileSync(userPath, JSON.stringify(userFile, null, 2));
        // fs.writeFile(userPath, JSON.stringify(userFile), 'utf8', function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }

        //     console.log("The file was saved!");
        // }); 
       
        bot_channel.send("**"+msg.author.username + " saved message:** " + saved_quotes[msg.author.username].quote);
      }
      else
      {
        bot_channel.send("**Please input a phrase to be saved. Example:** !quote Hello World!");
      }
    }
 
    if(msg.content === '!qs'){
      if (!saved_quotes[msg.author.username] || saved_quotes[msg.author.username].quote == ""){
        bot_channel.send("**No saved message**");
      }
      else{
        msg.channel.send(saved_quotes[msg.author.username].quote);
        msg.delete();
      }
    }

});


//client.login(auth.token);
client.login(process.env.BOT_TOKEN);


//heroku sleep prevention
var http = require("http");
setInterval(function() {
    http.get("http://covenantdiscordlinkbot.herokuapp.com");
}, 300000); // every 5 minutes (300000)
