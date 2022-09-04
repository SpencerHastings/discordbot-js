import {
    ChatInputCommandInteraction,
    ColorResolvable,
    CreateRoleOptions,
    EmbedBuilder, GuildMember, Role,
    SlashCommandBuilder,
    User
} from "discord.js";
import {Command} from "../command";
import UserError from "../userError";
import {getRoles, isHexColor, removeAllRolesBelow} from "../../utils/utils";

const highestRole: string = 'member';

const command = async (interaction: ChatInputCommandInteraction) => {
    let subcommand = interaction.options.getSubcommand();
    if (subcommand === 'add')
    {
        let role = interaction.options.getRole('role');
        if (role === null)
        {
            throw Error('Options missing for create role');
        }
        if (!(role instanceof Role))
        {
            throw Error('Is Api Role');
        }
        let roles = getRoles(interaction);
        if (roles !== null)
        {
            let filteredRoles = removeAllRolesBelow(highestRole, roles)
            if (filteredRoles !== null)
            {
                let ro = filteredRoles.filter(r => r.name == role!.name);
                if (ro.size !== 1)
                {
                    throw new UserError('Can\'t add that role.');
                }
                let roleToAdd = ro.first();
                if (roleToAdd === undefined)
                {
                    throw new Error('Bad error in role add');
                }
                if (interaction.guild !== null)
                {
                    let member = interaction.member;
                    if (member instanceof GuildMember)
                    {
                        await member.roles.add(roleToAdd);
                    }
                    await interaction.reply({content: 'Role added!', ephemeral: true});
                    return;
                }

                throw new Error('Guild not found');
            }
            throw new Error('Roles could not be filtered');
        }
        throw new Error('Roles not found');
    }
    else if (subcommand === 'create')
    {
        let name = interaction.options.getString('name');
        let color: any = interaction.options.getString('color');
        if (name === null || color === null)
        {
            throw Error('Options missing for create role');
        }
        if (!isHexColor(color))
        {
            throw new UserError(`Invalid Color ${color}`);
        }
        let roleColor: ColorResolvable = color;
        let roles = getRoles(interaction);
        if (roles !== null)
        {
            let ro = roles.filter(r => r.name == name);
            if (ro.size !== 0)
            {
                throw new UserError('Role name taken');
            }
            if (interaction.guild !== null)
            {
                let roleManager = interaction.guild.roles;
                let roleOptions: CreateRoleOptions = {
                    name: name,
                    color: roleColor,
                    reason: 'User created role.'
                };
                roleManager.create(roleOptions);
                await interaction.reply({content: 'Role created!', ephemeral: true});
                return;
            }
        }
        throw new Error('Roles not found');
    }
    else if (subcommand === 'list')
    {
        let roles = getRoles(interaction);
        if (roles !== null)
        {
            let filteredRoles = removeAllRolesBelow('member',roles)
            if (filteredRoles !== null)
            {
                let output = filteredRoles.map(r => r)
                    .join("\n");
                let embed = new EmbedBuilder()
                    .addFields({name: 'Roles', value: output})
                await interaction.reply({embeds: [embed], ephemeral: true});
                return;
            }
            throw new Error('Roles could not be filtered');
        }
        throw new Error('Roles not found');
    }
    else {
        throw new Error('Subcommand not recognized.');
    }
}

const builder = new SlashCommandBuilder()
    .setName('role')
    .setDescription('Role Managing')
    .addSubcommand(subcommandGroup =>
        subcommandGroup.setName('add')
            .setDescription('Add a role to yourself')
            .addRoleOption(option =>
                option.setName('role')
                    .setDescription('Role name')
                    .setRequired(true)
            )
    )
    .addSubcommand( subcommandGroup =>
        subcommandGroup.setName('create')
            .setDescription('Create a role')
            .addStringOption(option =>
                option.setName('name')
                    .setDescription('Role name')
                    .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('color')
                    .setDescription('Hex Color Value')
                    .setRequired(true)
            )
    )
    .addSubcommand( subcommandGroup =>
        subcommandGroup.setName('list')
            .setDescription('List available roles')
    )

const roles: Command = {
    name: 'role',
    commandBuilder: builder,
    execute: command,
}

export default roles