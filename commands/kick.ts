import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks a user',
    
    requireRoles: true,

    slash: 'both',

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER' , 'STRING'],

    callback: ({ message, interaction, args }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            return 'Please specify a user to kick.'
        }

        if (!target.kickable) {
            return 'The specified user cannot be kicked.'
        }

        args.shift()
        const reason = args.join(' ')

        target.kick(reason)

        return `<@${target.id}> was kicked. User ID - ${target.id}`
    }
} as ICommand