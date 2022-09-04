import { config as dotenvConfig } from 'dotenv';

dotenvConfig()

const config = {
    token: (process.env.DISCORD_TOKEN as string),
    prefix: (process.env.PREFIX as string),
    guild_id: (process.env.GUILD_ID as string),
    client_id: (process.env.CLIENT_ID as string),
}

export = config