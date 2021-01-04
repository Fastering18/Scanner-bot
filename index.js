const discord = require("discord.js");
const { createWorker } = require("tesseract.js");

const client = new discord.Client();

const dotconfig = require("dotenv").config();

const prefix = "=";  //change it to whatever..

const fileEXT = [
    ".PNG",
    ".png",
    ".jpg",
    ".jpeg"
]

client.on("ready", () => {
    console.log("Bot aktif");
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
        let link = args[0];
        //if (link.endsWith(".png") || link.endsWith(".PNG")) {
        if (message.attachments.size >= 1) {
            console.log(message.attachments.size)
            console.log(JSON.stringify(message.attachments))
            link = message.attachments.array()[0].url
        }
        if (!link) return message.channel.send("Format: `" + prefix + "teks [link]`");

        message.channel.send("Memproses... ").then(msg => {
            const worker = createWorker({
                logger: m => {
                    if (!m.progress) return;
                    if (m.progress == 0 || m.progress == 1 || m.progress == 0.5) return;
                    
                    return msg.edit(`Memproses, ${Math.floor(m.progress * 100)}%`);  //remove this line if you dont want to bypass Discord rate-limit                 
                }
            });

            (async () => {
                await worker.load();
                await worker.loadLanguage('eng');
                await worker.initialize('eng');
                const { data: { text } } = await worker.recognize(link).catch(err => { msg.edit("Link harus berupa gambar!") });

                msg.edit(`Hasil: ${"`" + text + "`"}`);
                await worker.terminate();
            })();
        })
        //}
    }
})

client.login("Bot token here..")
