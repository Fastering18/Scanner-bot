const discord = require("discord.js");
const scanner = require("tesseract.js");

const client = discord.Client();

const dotconfig = require("dotenv").config();
const prefix = "=";

client.on("ready", () => {
    console.log("Bot aktiv");
})

client.on("message", async message => {
    if (message.author.bot) return;
    const guild = message.guild;
    const pengirim = message.author;
    const pesan = message.content.slice()

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if (command === "teks") {
         scanner.recognize(args[0], "eng", { logger: m => console.log(m) }).then(({ data: { text } }) => {
             message.channel.send(text)
         })
    }
})

client.login("Nzc3NzU2NTAzMDI4NDAwMTM4.X7IEMA.Giia9XmQ7drYspNaqoYIz4nynew")
