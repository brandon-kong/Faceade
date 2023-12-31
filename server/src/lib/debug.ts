export const isDebug = process.env.NODE_ENV !== 'production';

export default class Debug
{
    static log(...args: any[])
    {
        if (isDebug)
            console.log(...args);
    }

    static error(...args: any[])
    {
        if (isDebug)
            console.error(...args);
    }

    static warn(...args: any[])
    {
        if (isDebug)
            console.warn(...args);
    }
}