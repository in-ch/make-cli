const colorMap: { [key: string]: string } = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',

    lightBlack: '\x1b[90m',
    lightRed: '\x1b[91m',
    lightGreen: '\x1b[92m',
    lightYellow: '\x1b[93m',
    lightBlue: '\x1b[94m',
    lightMagenta: '\x1b[95m',
    lightCyan: '\x1b[96m',
    lightWhite: '\x1b[97m',

    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',

    bgLightBlack: '\x1b[100m',
    bgLightRed: '\x1b[101m',
    bgLightGreen: '\x1b[102m',
    bgLightYellow: '\x1b[103m',
    bgLightBlue: '\x1b[104m',
    bgLightMagenta: '\x1b[105m',
    bgLightCyan: '\x1b[106m',
    bgLightWhite: '\x1b[107m',

    default: '\x1b[0m',
};

interface boxedMessageProps {
    messages: string[];
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    rtEdge?: string;
    ltEdge?: string;
    rbEdge?: string;
    lbEdge?: string;
    align?: 'left' | 'center' | 'right';
    borderColor?: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' |
    'lightBlack' | 'lightRed' | 'lightGreen' | 'lightYellow' | 'lightBlue' | 'lightMagenta' | 'lightCyan' | 'lightWhite' |
    'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite' |
    'bgLightBlack' | 'bgLightRed' | 'bgLightGreen' | 'bgLightYellow' | 'bgLightBlue' | 'bgLightMagenta' | 'bgLightCyan' | 'bgLightWhite' |
    'default';
    textColor?: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' |
    'lightBlack' | 'lightRed' | 'lightGreen' | 'lightYellow' | 'lightBlue' | 'lightMagenta' | 'lightCyan' | 'lightWhite' |
    'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite' |
    'bgLightBlack' | 'bgLightRed' | 'bgLightGreen' | 'bgLightYellow' | 'bgLightBlue' | 'bgLightMagenta' | 'bgLightCyan' | 'bgLightWhite' |
    'default';
}

/**
 * @param {string[]} messages - The messages to be boxed.
 * @param {number} minWidth - The minimum width of the box.
 * @param {number} maxWidth - The maximum width of the box.
 * @param {number} minHeight - The minimum height of the box.
 * @param {number} maxHeight - The maximum height of the box.
 * @param {string} rtEdge - The right top edge of the box. 
 * @param {string} ltEdge - The left top edge of the box.
 * @param {string} rbEdge - The right bottom edge of the box.
 * @param {string} lbEdge - The left bottom edge of the box.
 * @param { 'left' | 'center' | 'right'} align - The alignment of the messages in the box.
 * @param { 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'black' | 'default'} borderColor - The color of the border.
 * @param { 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'black' | 'default'} textColor - The color of the text.
 * @returns {string} A string with the messages boxed in a box.
 */
export default function boxedMessage({
    messages,
    minWidth = 40,
    maxWidth = 999,
    minHeight = 5,
    maxHeight = 999,
    rtEdge = '╮',
    ltEdge = '╭',
    rbEdge = '╯',
    lbEdge = '╰',
    align = 'center',
    textColor = 'default',
    borderColor = 'default'
}: boxedMessageProps): string {
    const borderColorCode = colorMap[borderColor] || colorMap.default;
    const textColorCode = colorMap[textColor] || colorMap.default;
    const defaultCode = colorMap.default;

    const maxLength = messages.reduce((max, message) => Math.max(max, message.length), 0);
    const boxWidth = Math.min(maxWidth, Math.max(minWidth, maxLength));

    const pad = (str: string) => {
        if (align === 'left') {
            return str.padEnd(boxWidth);
        } else if (align === 'right') {
            return str.padStart(boxWidth);
        } else if (align === 'center') {
            const totalPadding = boxWidth - str.length;
            const leftPadding = Math.floor(totalPadding / 2);
            const rightPadding = totalPadding - leftPadding;
            return ' '.repeat(leftPadding) + str + ' '.repeat(rightPadding);
        }
    };

    const borderTop = `${borderColorCode}${ltEdge}${'─'.repeat(boxWidth + 2)}${rtEdge}${defaultCode}`;
    const borderBottom = `${borderColorCode}${lbEdge}${'─'.repeat(boxWidth + 2)}${rbEdge}${defaultCode}`;
    const emptyLine = `${borderColorCode}│${' '.repeat(boxWidth + 2)}│${defaultCode}`;

    const adjustedMessages = messages.slice(0, maxHeight - 2);
    const paddedMessages = adjustedMessages.map((message: string) =>
        `${borderColorCode}│ ${textColorCode}${pad(message)}${defaultCode} ${borderColorCode}│${defaultCode}`);

    while (paddedMessages.length < minHeight - 2) {
        paddedMessages.push(emptyLine);
    }

    const boxedMessage = [
        borderTop,
        emptyLine,
        ...paddedMessages,
        emptyLine,
        borderBottom
    ].join('\n');

    return boxedMessage;
}