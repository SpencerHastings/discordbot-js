import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {Command} from "../../command";

const quotes: string[] = [
    "The philosophers have only interpreted the world, in various ways. The point, however, is to change it.",
    "Keep people from their history, and they are easily controlled.",
    "Accumulation of wealth at one pole is at the same time accumulation of misery, agony of toil, slavery, ignorance, brutality, mental degradation, at the opposite pole.",
    "Surround yourself with people who make you happy. People who make you laugh, who help you when you’re in need. People who genuinely care. They are the ones worth keeping in your life. Everyone else is just passing through.",
    "Take away a nation's heritage and they are more easily persuaded.",
    "The education of all children, from the moment that they can get along without a mother's care, shall be in state institutions.",
    "The last capitalist we hang shall be the one who sold us the rope.",
    "Let the ruling classes tremble at a Communistic revolution. The proletarians have nothing to lose but their chains. They have a world to win.",
    "Reason has always existed, but not always in a reasonable form.",
    "If anything is certain, it is that I myself am not a Marxist.",
]

const pingCommand = async (interaction: ChatInputCommandInteraction) => {
    const random = Math.floor(Math.random() * quotes.length);
    let quote = quotes[random]
    await interaction.reply(quote);
}

const builder = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Average ping command');

const ping: Command = {
    name: 'ping',
    commandBuilder: builder,
    execute: pingCommand,
}

export default ping