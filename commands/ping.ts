import { ICommand } from "wokcommands";

export default {
    category: 'Test',
    description: 'Pong',

    slash:"both",

    callback: () => {
        return 'Pong.'
    }
} as ICommand