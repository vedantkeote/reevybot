import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Clears a specified amount of messages from chat.',
    permissions: ['ADMINISTRATOR'],
    maxArgs:1,
    expectedArgs: '[amount]',
    requireRoles: true,
    slash: 'both',
    guildOnly: true,
        
    callback: async({ message, interaction, channel, args }) => {
        const amount = args.length ? parseInt(args.shift()!) : 5

        if (message) {
            await message.delete()
        }

        const { size } = await channel.bulkDelete(amount, true)

        const reply = `Deleted ${size} message(s).`

        if (interaction) {
            return reply
        }

        channel.send(reply)

        setTimeout(async() => {
            await message.delete()
        }, 1000 * 5)
    }
} as ICommand