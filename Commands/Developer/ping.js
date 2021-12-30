const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "ping command",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        interaction.reply({content: "POING"})
    }
}