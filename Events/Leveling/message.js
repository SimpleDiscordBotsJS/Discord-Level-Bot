const { Message, MessageEmbed } = require("discord.js");
const fs = require("fs");
const levelFile = require("../../Structures/dataBase.json");

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     */
    async execute(message) {
        if(message.author.bot) return;
        if(message.channel.type == 'dm') return;

        try {
            RandomXP(message);
        } catch (e) {
            console.log(`[ERROR] - ${e}`);
        }
        return;
    }
}

function RandomXP(message){
    const randomNumber = Math.floor(Math.random() * 30) + 1; //how lower the first number => how longer to chat until new level
    var idUser = message.author.id;
    if(!levelFile[idUser]) {
        levelFile[idUser] = {
            xp: 0,
            level: 0
        }
    }
    levelFile[idUser].xp += randomNumber;
    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;
    var nextLevelXp = levelUser * 300; //xp needed for level up (every level times the amount of xp needed)
    if(nextLevelXp == 0) nextLevelXp = 100;
    if(xpUser >= nextLevelXp) {
        levelFile[idUser].level += 1;
        
        message.channel.send({embeds: [new MessageEmbed().setColor("RANDOM").setTimestamp()
        .setDescription(`**Level:** ${levelFile[idUser].level} \n**XP:** ${xpUser}`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048})).setTitle("**🎊 Level UP 🎊**")
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}))]});
    }
    fs.writeFile("./Structures/dataBase.json", JSON.stringify(levelFile), err =>{
        if(err) console.log(err);
    });
}