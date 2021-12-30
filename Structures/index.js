const Discord = require("discord.js"); //Библиотека
const client = new Discord.Client({ intents: 32767 }); //Создание клиента
const config = require("./config.json"); //Загрузка конфига
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

//===========================================================

client.commands = new Discord.Collection();

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

//===========================================================



//===========================================================

//Подключение к боту и вывод ошибки в случае отсутствия токена, или если токен неверен.
client.login(config.BOT_TOKEN).catch(() => Console.error("[BOT] Invalid Bot Login Token."));