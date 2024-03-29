import { Client } from 'discord.js';

export default (client: Client) => {
    const statusOptions = [                                                                //{ type: '' , message: '' },
        { type: 'PLAYING', message: 'with my dog.' } ,
        { type: 'WATCHING', message: 'the mods in the closet.' },
        { type: 'PLAYING' , message: 'Minecraft' },
        { type: 'LISTENING' , message: 'to ASMR code noises.' },
        { type: 'WATCHING' , message: 'streams on twitch.' },
        { type: 'STREAMING' , message: 'Going live at some point Copege' },
        { type: 'PLAYING' , message: 'Valorant' },
        { type: 'WATCHING' , message: 'everyone from the shadows' },
        { type: 'WATCHING' , message: 'out for latest COVID-19 info' },
        { type: 'WATCHING' , message: 'everyone' },
        { type: 'WATCHING' , message: 'out for rule breakers' },
        { type: 'LISTENING' , message: '"MASK"- Dream (Official Sus Remix)' },
        { type: 'LISTENING' , message: 'to heavy metal "music"' },
        { type: 'PLAYING' , message: 'with the bois' },
        { type: 'WATCHING' , message: 'YOU' },
    ]  as any


    const updateStatus = () => {
        const index = Math.floor(Math.random() * (statusOptions.length -1) +1)

        if (statusOptions[index].type !== 'STREAMING') {
            client.user?.setActivity(statusOptions[index].message, { type: statusOptions[index].type })
        } else {
            client.user?.setActivity(statusOptions[index].message, { type: 'STREAMING', url: 'https://www.twitch.tv/vedthegreat' })
        }
        setTimeout(updateStatus, 1000 * 60 )
    }
    updateStatus()
}

export const config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status changer.',
}
