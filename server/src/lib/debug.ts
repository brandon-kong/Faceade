export default class Debug
{
    static log(...args: any[])
    {
        if (process.env.NODE_ENV !== 'production')
            console.log(...args);
    }

    static error(...args: any[])
    {
        if (process.env.NODE_ENV !== 'production')
            console.error(...args);
    }

    static warn(...args: any[])
    {
        if (process.env.NODE_ENV !== 'production')
            console.warn(...args);
    }
}