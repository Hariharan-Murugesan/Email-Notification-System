export const redisURLForBullMQ = () => {
    const URL: string = process?.env?.REDIS_URL as string;
    const PORT: string = process?.env?.REDIS_PORT as string;
    const redisURLForBullMQ = {
        host: URL,
        port: parseInt(PORT)
    }
    return redisURLForBullMQ
}