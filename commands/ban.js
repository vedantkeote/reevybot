"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const punishment_schema_1 = __importDefault(require("../models/punishment-schema"));
exports.default = {
    category: 'Moderation',
    description: 'bans a user',
    requireRoles: true,
    slash: 'both',
    testOnly: true,
    guildOnly: true,
    minArgs: 3,
    expectedArgs: '<user> <duration> <reason>',
    expectedArgsTypes: ['USER', 'STRING', 'STRING'],
    callback: ({ args, member: staff, guild, client, message, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let userId = args.shift();
        const duration = args.shift();
        const reason = args.join(' ');
        let user;
        if (message) {
            user = (_a = message.mentions.users) === null || _a === void 0 ? void 0 : _a.first();
        }
        else {
            user = interaction.options.getUser('user');
        }
        if (!user) {
            userId = userId.replace(/[<@!>]/g, '');
            user = yield client.users.fetch(userId);
        }
        if (!user) {
            return `could not find a user with the id ${userId}`;
        }
        userId = user.id;
        let time;
        let type;
        try {
            const split = duration.match(/\d+|\D+/g);
            time = parseInt(split[0]);
            type = split[1].toLocaleLowerCase();
        }
        catch (e) {
            return "Invalid time format! Example format: \"10d\" where 'd' = days , 'h' = hours , 'm' = minutes.";
        }
        if (type === 'h') {
            time *= 60;
        }
        else if (type === 'd') {
            time *= 60 * 24;
        }
        else if (type !== 'm') {
            return 'Please use m , h and d for minutes, hours and days respectively.';
        }
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + time);
        const result = yield punishment_schema_1.default.findOne({
            guildId: guild === null || guild === void 0 ? void 0 : guild.id,
            userId,
            type: 'ban',
        });
        if (result) {
            return `<@${userId}> is already banned in this server.`;
        }
        try {
            yield (guild === null || guild === void 0 ? void 0 : guild.members.ban(userId, { reason }));
            yield new punishment_schema_1.default({
                userId,
                guildId: guild === null || guild === void 0 ? void 0 : guild.id,
                staffId: staff.id,
                reason,
                expires,
                type: 'ban',
            }).save();
        }
        catch (ignored) {
            return 'Cannot ban that user.';
        }
        return `<@${userId}> has been banned for "${duration}"`;
    }),
};
