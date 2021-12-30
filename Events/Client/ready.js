const { Client } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log(`✅ Запущен от имени бота: ${client.user.tag}!`);
        client.user.setActivity("Pinguins sex", {type: "STREAMING"});
    }
}