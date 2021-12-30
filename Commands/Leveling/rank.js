const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const levelFile = require("../../Structures/dataBase.json");
const { join } = require("path");

module.exports = {
    name: "rank",
    description: "Show user level",
    permission: "ADMINISTRATOR",
    options: [
        { name: "user", description: "User", type: "USER", required: false }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        try {
            var User = interaction.options.getUser("user");
            if(interaction.options.getUser("user") == null) User = interaction.user;
            if(User.bot) return interaction.reply({content: "Bot? Realy?", ephemeral:true});

            if(!levelFile[User.id]){
                levelFile[User.id] = {
                    xp: 0,
                    level: 0
                }
            }

            var levelUser = levelFile[User.id].level;
            var xpUser = levelFile[User.id].xp;
            var nextLevelXp = levelUser * 300;

            if(levelUser == 0) nextLevelXp = 100;

            const totalRank = Object.values(levelFile).sort((a, b) => { return b.xp - a.xp });
            let ranking = totalRank.map(x => x.xp).indexOf(xpUser) + 1;

            const canvas = createCanvas(1000, 333)
            const ctx = canvas.getContext("2d");
            const background = await loadImage(join(__dirname, "..", "..", "Structures", "wallpaper.png"));
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#A3A3A3"
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#000000"
            ctx.fillRect(180, 216, 775, 65);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeRect(180, 216, 775, 65);
            ctx.stroke();
            
            ctx.fillStyle = "#838383";
            ctx.globalAlpha = 0.6;
            ctx.fillRect(200, 216, ((100 / (nextLevelXp)) * xpUser) * 7.5, 65);
            ctx.fill();
            ctx.globalAlpha = 1; 

            ctx.font = '30px sans-serif';
            ctx.textAlign = "center";
            ctx.fillStyle = "#beb1b1";
            ctx.fillText(`${xpUser} / ${nextLevelXp} XP`, 600, 260);

            ctx.font = '35px sans-serif';
            ctx.textAlign = "left";
            ctx.fillText(User.tag, 325, 125);

            ctx.font = '40px sans-serif';
            ctx.fillText("Level: ", 350, 170);
            ctx.fillText(levelUser, 500, 170);

            ctx.font = '40px sans-serif';
            ctx.fillText("Rank: ", 700, 170);
            ctx.fillText(ranking, 830, 170);

            ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
            ctx.lineWidth = 6;
            ctx.strokeStyle = "#A3A3A3"
            ctx.stroke();
            ctx.closePath();
            ctx.clip();
            const avatar = await loadImage(User.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
            ctx.drawImage(avatar, 40, 40, 250, 250);

            return interaction.reply({files: [new MessageAttachment(canvas.toBuffer())]});

        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED").setDescription(`⛔ **[ERROR]:** ${e}`);
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}