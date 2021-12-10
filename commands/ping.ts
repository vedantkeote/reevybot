import { ICommand } from "wokcommands";

export default {
    category: 'Test',
    description: 'Pong',
    testOnly: true,

    slash:"both",

    callback: () => {
        return 'Pong.'
    }
} as ICommand