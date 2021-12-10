import { GuildStickerManager, User } from 'discord.js'
import { ICommand } from 'wokcommands'
import punishmentSchema from '../models/punishment-schema'

export default {
    category: 'Moderation',
    description: 'bans a user',
    requireRoles: true,
    slash: 'both',
    testOnly: true,
    guildOnly: true,

    minArgs: 3,
    expectedArgs: '<user> <duration> <reason>',
    expectedArgsTypes: ['USER' , 'STRING' , 'STRING'],

    callback: async ({
        args,
        member: staff,
        guild,
        client,
        message,
        interaction
    }) => {
        let userId = args.shift()!
        const duration = args.shift()!
        const reason = args.join(' ')
        let user: User | undefined

        if (message) {
            user = message.mentions.users?.first()
        } else {
            user = interaction.options.getUser('user') as User
        }

        if (!user) {
            userId = userId.replace(/[<@!>]/g, '') 
            user = await client.users.fetch(userId)
        }

        if (!user) {
            return `could not find a user with the id ${userId}`
        }

        userId = user.id

        let time 
        let type
        try {
            const split = duration.match(/\d+|\D+/g)
            time = parseInt(split![0])
            type = split![1].toLocaleLowerCase()
        } catch (e) {
            return "Invalid time format! Example format: \"10d\" where 'd' = days , 'h' = hours , 'm' = minutes."
        }

        if ( type === 'h' ) {
            time *= 60
        } else if ( type === 'd' ) {
            time *= 60 * 24
        } else if ( type !== 'm' ) {
            return 'Please use m , h and d for minutes, hours and days respectively.'
        }

        const expires = new Date() 
        expires.setMinutes(expires.getMinutes() + time)

        const result = await punishmentSchema.findOne({
            guildId: guild?.id,
            userId,
            type: 'ban', 
        })

        if (result) {
            return `<@${userId}> is already banned in this server.`
        }

        try {
            await guild?.members.ban(userId, { reason })

            await new punishmentSchema({
                userId,
                guildId: guild?.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'ban',
            }).save()
        } catch (ignored) {
            return 'Cannot ban that user.'
        }

        return `<@${userId}> has been banned for "${duration}"`
    },
} as ICommand