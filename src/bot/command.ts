import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";


export interface Command {
    name: string
    command_builder: SlashCommandBuilder
    execute(interaction: ChatInputCommandInteraction): void
}