// Discord Bot, code doesn't work as it requires all folder files and JSON dependencies



// Libraries / API requirements
const Discord = require('discord.js')
const client = new Discord.Client()
const Hypixel  = require("@zikeji/hypixel");
const clientH = new Hypixel.Client((""))
var MojangAPI = require('mojang-api');

const weather = require('weather-js');
const { randomInt } = require('crypto');
client.login("");
const virus = require('@freezegold/covid-19');

const today = new Date();


// Turning on the client
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    setTimeout(function(){ // in leftToEight() milliseconds run this:
        sendMessage(); // send the message once
        var dayMillseconds = 1000 * 60 * 60 * 24;
        setInterval(function(){ // repeat this every 24 hours
            sendMessage();
        }, dayMillseconds)
    }, leftToEight())

});

function leftToEight(){
    var d = new Date();
    return (-d + d.setHours(8,0,0,0));
};

function sendMessage(){

    virus.covid('global', (err, res) => {
        if(err) throw err
        console.log(res)
        /* return 
          {
            confirmed: '53,479,378',
            recovered: '34,519,061',
            deaths: '1,304,682'
          }
        */
           var guild = client.guilds.cache.get('');
    if(guild && guild.channels.cache.get('')){
        guild.channels.cache.get('').send(("```"+"COVID cases for "+today+"\n\n"+res.confirmed+" confirmed cases worldwide.\n"+res.deaths+" confirmed deaths worldwide.```")); }
      });
};

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    if (receivedMessage.content.startsWith("KABOB")) {
        processCommand(receivedMessage)
    }
})




function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(5) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let argumentsX = splitCommand.slice(1) // All other words are argumentsX/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("argumentsX: " + argumentsX) // There may not be any argumentsX

    if (primaryCommand == "help") {
        helpCommand(argumentsX, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(argumentsX, receivedMessage)
    } else if(primaryCommand == "skywars"){
        skywarsKills(argumentsX, receivedMessage)
    } else if(primaryCommand == "ottawa"){
        weatherr(receivedMessage)
    } else if (primaryCommand =="weather"){
        forecast(argumentsX, receivedMessage)
    } else if (primaryCommand == "covid" || primaryCommand == "COVID" || primaryCommand == "cov") {
        covid(receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand the command.")
    }
}

function helpCommand(argumentsX, receivedMessage) {
    
    if (argumentsX.length > 0) {
        if(argumentsX == "Kabob"){
            receivedMessage.channel.send("KABOB KABOB KABOB ")
    } else {
        receivedMessage.channel.send("KABOBhelp did not understand what you said. Proper KABOB is `KABOBhelp [topic]`\n ")
    }
}


function multiplyCommand(argumentsX, receivedMessage) {
    if (argumentsX.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    let product = 1 
    argumentsX.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + argumentsX + " multiplied together is: " + product.toString())
}

function skywarsKills(argumentsX, receivedMessage){
    let pName = argumentsX;
    if (argumentsX.length === 1) {
    
    let test = false;
    test = (/^[a-z0-9]+$/i.test(argumentsX)) 
    if (test === false)
    {
        receivedMessage.channel.send("Invalid set of unicode")
        return
    }
    
    MojangAPI.nameToUuid(argumentsX,  function(err, res) {
        if (res[0] === undefined) {
            console.log("idk this")
            receivedMessage.channel.send("your input doesn't work ")
            return
        } else{
            if (err)
            console.log(err);
            else {

            console.log(res[0].name + "? No, they're " + res[0].id + " to me.");
                (async () => {
                const player = await clientH.player.uuid(res[0].id);
                //console.log(player)

                if(player === undefined) {
                    receivedMessage.channel.send("`Player name is invalid or they have no Skywars kills yet`" )
                    return
                } else {
                receivedMessage.channel.send("`Player " + pName + " has " + player.stats.SkyWars.kills + " skywars kills. `" )}
                })();
        } 
        }

    })}
    else {
        receivedMessage.channel.send("Invalid input")
    }
}

function weatherr(receivedMessage){
    weather.find({search: 'Ottawa', degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);
       
        console.log("-------------------------------------------------NEW DATA")
        console.log(JSON.stringify(result, null, 2));

        const weatherPhoto = new Discord.MessageAttachment(result[0].current.imageUrl)
        
        receivedMessage.channel.send(weatherPhoto)

        receivedMessage.channel.send("```Weather in Ottawa" + "\nCurrent Temperature: " +   + " Feels like: " +result[0].current.feelslike + "\nCurrent Conditions: " + result[0].current.skytext + "\nWind Conditions: " + result[0].current.windspeed + "\nLow: " + result[0].forecast[1].low +" High: "+ result[0].forecast[1].high + "```")
      });

}

function covid(receivedMessage){
    virus.covid('global', (err, res) => {
        if(err) throw err
        console.log(res)
        /* return 
          {
            confirmed: '53,479,378',
            recovered: '34,519,061',
            deaths: '1,304,682'
          }
        */
       receivedMessage.channel.send("```"+"COVID cases for "+today+"\n\n"+res.confirmed+" confirmed cases worldwide.\n"+res.deaths+" confirmed deaths worldwide.```")
      });
       
      virus.covid('canada', (err, res) => {
        if(err) throw err
        console.log(res)
        /* return 
          {
            confirmed: '69,675',
            recovered: '23,074',
            deaths: '997'
          }
        */
       receivedMessage.channel.send("```"+res.confirmed+" confirmed cases in Canada.\n"+res.deaths+" confirmed deaths in Canada.\n\nThanks people who don't social distance.....```")
      });
}
