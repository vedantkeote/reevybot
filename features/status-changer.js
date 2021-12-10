"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = (client) => {
    const statusOptions = [
        { type: 'PLAYING', message: 'with my dog.' },
        { type: 'WATCHING', message: 'the mods in the closet.' },
        { type: 'PLAYING', message: 'Minecraft' },
        { type: 'LISTENING', message: 'to ASMR code noises.' },
        { type: 'WATCHING', message: 'Streams on twitch.' },
        { type: 'STREAMING', message: 'Going live at some point Copege' },
        { type: 'PLAYING', message: 'Valorant' },
        { type: 'WATCHING', message: 'everyone from the shadows' },
        //{ type: '' , message: '' },
    ];
    let counter = 0;
    const updateStatus = () => {
        var _a, _b;
        const index = Math.floor(Math.random() * (statusOptions.length - 1) + 1);
        if (statusOptions[index].type !== 'STREAMING') {
            (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity(statusOptions[index].message, { type: statusOptions[index].type });
        }
        else {
            (_b = client.user) === null || _b === void 0 ? void 0 : _b.setActivity(statusOptions[index].message, { type: 'STREAMING', url: 'https://www.twitch.tv/vedthegreat' });
        }
        setTimeout(updateStatus, 1000 * 60);
    };
    updateStatus();
};
exports.config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status changer.',
};
