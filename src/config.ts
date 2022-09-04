import {config as dotenvConfig} from 'dotenv';

dotenvConfig()

const config = {
    token: (process.env.DISCORD_TOKEN as string),
    guild_id: (process.env.GUILD_ID as string),
    client_id: (process.env.CLIENT_ID as string),
    test_mode: ((process.env.TEST_MODE as string) === 'true'),
}

export = config