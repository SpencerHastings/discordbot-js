import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {Command} from "../../command";

const quotes: string[] = [
    "The philosophers have only interpreted the world, in various ways. The point, however, is to change it.", "Surround yourself with people who make you happy. People who make you laugh, who help you when you’re in need. People who genuinely care. They are the ones worth keeping in your life. Everyone else is just passing through.",
    "Let the ruling classes tremble at a Communistic revolution. The proletarians have nothing to lose but their chains. They have a world to win.",
    "Reason has always existed, but not always in a reasonable form.",
    "If anything is certain, it is that I myself am not a Marxist.",
    "Greek philosophy seems to have met with something with which a good tragedy is not supposed to meet, namely, a dull ending.",
    "The bureaucracy is a circle from which no one can escape. Its hierarchy is a hierarchy of knowledge.",
    "All forms of the state have democracy for their truth, and for that reason are false to the extent that they are not democracy.",
    "The state is based on this contradiction. It is based on the contradiction between public and private life, between universal and particular interests. For this reason, the state must confine itself to formal, negative activities",
    "Communism is the riddle of history solved, and it knows itself to be this solution.",
    "Natural science will in time incorporate into itself the science of man, just as the science of man will incorporate into itself natural science: there will be one science.",
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