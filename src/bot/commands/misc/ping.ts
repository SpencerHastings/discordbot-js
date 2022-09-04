import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {Command} from "../../command";

const pingCommand = async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('Pong!');
}

const builder = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Average ping command');

const ping: Command = {
    name: 'ping',
    command_builder: builder,
    execute: pingCommand,
}

export default ping