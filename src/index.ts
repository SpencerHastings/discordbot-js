import Bot from './bot/bot'
import { token } from './config'

const bot = new Bot()
bot.run(token)