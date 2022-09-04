import {ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "discord.js";


export interface Command {
    name: string
    commandBuilder: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder
    execute(interaction: ChatInputCommandInteraction): Promise<void>
}