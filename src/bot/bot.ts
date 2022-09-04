import {Client, ClientOptions, GatewayIntentBits, Collection, REST, Routes} from 'discord.js'
import config from '../config'
import {Command} from './command'
import UserError from "./userError";
import commandList from "./commands/command-list";

const readInCommands = (): Collection<string, Command> => {
    const commands: Collection<string, Command> = new Collection();
    for (const command of commandList) {
        commands.set(command.name, command);
    }
    return commands;
}

export default class Bot {

    run(token: string) {
        const options: ClientOptions = {
            intents: [
                GatewayIntentBits.Guilds,
            ]
        };
        const client = new Client(options);
        const commands: Collection<string, Command> = readInCommands();
        const commandBuilders = commands.map(command => command.commandBuilder.toJSON());
        const rest = new REST({version: '10'}).setToken(token);

        (async () => {
            try {
                console.log(`Started refreshing application (/) commands.`);

                await rest.put(
                    Routes.applicationGuildCommands(config.client_id, config.guild_id),
                    { body: commandBuilders },
                );

                console.log(`Successfully reloaded application (/) commands.`);
            } catch (error) {
                console.error(error);
            }
        })();

        client.once('ready', () => {
            console.log('Ready!');
        })

        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isChatInputCommand()) return;

            if (!commands.has(interaction.commandName)) {
                return;
            }

            const c = commands.get(interaction.commandName);

            try {
                if (c) {
                    await c.execute(interaction);
                }
            }
            catch (e) {
                console.log('Catch hit');
                console.error(e);
                if (e instanceof UserError) {
                    await interaction.reply({ content: e.userMessage, ephemeral: true });
                } else {
                    await interaction.reply({ content: "An error has occurred.", ephemeral: true });
                }

            }
        });

        client.login(token).then(_ => console.log('Logged In!'));
    }
}



