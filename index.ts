import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import path from 'path'
import WOKCommands from 'wokcommands'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
})

client.on('ready', async() => {
    console.log('Boot process started.')

    new WOKCommands (client, {
        typeScript:true,
        testServers:['912344510493777980'],
        botOwners: ['708914012162752592'],
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        mongoUri: process.env.MONGO_URI,
        dbOptions: {
            keepAlive: true,
        }
    })
})

client.login(process.env.TOKEN)