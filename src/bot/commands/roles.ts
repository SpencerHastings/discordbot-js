import {
    ChatInputCommandInteraction,
    ColorResolvable,
    CreateRoleOptions,
    EmbedBuilder,
    GuildMember,
    Role,
    SlashCommandBuilder,
} from "discord.js";
import {Command} from "../command";
import UserError from "../userError";
import {getRoleByName, getRoles, isHexColor, moveRoleBelow, removeAllRolesBelow} from "../../utils/utils";

const highestRole: string = 'member';

const listCommand = async (interaction: ChatInputCommandInteraction) => {
    let roles = getRoles(interaction);
    if (roles !== null) {
        let filteredRoles = removeAllRolesBelow('member', roles)
        if (filteredRoles !== null) {
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

const createCommand = async (interaction: ChatInputCommandInteraction) => {
    let name = interaction.options.getString('name');
    let color: any = interaction.options.getString('color');
    if (name === null || color === null) {
        throw Error('Options missing for create role');
    }
    if (!isHexColor(color)) {
        throw new UserError(`Invalid Color ${color}`);
    }
    let roleColor: ColorResolvable = color;
    let roles = getRoles(interaction);
    if (interaction.guild === null) {
        throw Error('guild not found');
    }
    let memberRole = getRoleByName(highestRole, interaction.guild);
    if (memberRole === null) {
        throw Error('highest role not found');
    }
    if (roles !== null) {
        let ro = roles.filter(r => r.name == name);
        if (ro.size !== 0) {
            throw new UserError('Role name taken');
        }
        if (interaction.guild !== null) {

            await interaction.reply({content: 'Creating role...', ephemeral: true});
            let roleManager = interaction.guild.roles;
            let roleOptions: CreateRoleOptions = {
                name: name,
                color: roleColor,
                reason: 'User created role.'
            };
            let newRole = await roleManager.create(roleOptions);
            await moveRoleBelow(newRole, interaction, memberRole);
            await interaction.followUp({content: 'Role created!', ephemeral: true});
            return;
        }
    }
    throw new Error('Roles not found');
}

const addCommand = async (interaction: ChatInputCommandInteraction) => {
    let role = interaction.options.getRole('role');
    if (role === null) {
        throw Error('Options missing for create role');
    }
    if (!(role instanceof Role)) {
        throw Error('Is Api Role');
    }
    let roles = getRoles(interaction);
    if (roles !== null) {
        let filteredRoles = removeAllRolesBelow(highestRole, roles)
        if (filteredRoles !== null) {
            let ro = filteredRoles.filter(r => r.name == role!.name);
            if (ro.size !== 1) {
                throw new UserError('Can\'t add that role.');
            }
            let roleToAdd = ro.first();
            if (roleToAdd === undefined) {
                throw new Error('Bad error in role add');
            }
            if (interaction.guild !== null) {
                let member = interaction.member;
                if (member instanceof GuildMember) {
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

const command = async (interaction: ChatInputCommandInteraction) => {
    let subcommand = interaction.options.getSubcommand();
    if (subcommand === 'add') {
        await addCommand(interaction);
    } else if (subcommand === 'create') {
        await createCommand(interaction);
    } else if (subcommand === 'list') {
        await listCommand(interaction);
    } else {
        throw new Error('Subcommand not recognized.');
    }
}

const builder = new SlashCommandBuilder()
    .setName('role')
    .setDescription('Role Managing')
    .addSubcommand(subcommandGroup =>
        subcommandGroup.setName('add')
            .setDescription('Add a vanity role to yourself')
            .addRoleOption(option =>
                option.setName('role')
                    .setDescription('Role name')
                    .setRequired(true)
            )
    )
    .addSubcommand(subcommandGroup =>
        subcommandGroup.setName('create')
            .setDescription('Create a vanity role')
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
    .addSubcommand(subcommandGroup =>
        subcommandGroup.setName('list')
            .setDescription('List available vanity roles')
    )

const roles: Command = {
    name: 'role',
    commandBuilder: builder,
    execute: command,
}

export default roles