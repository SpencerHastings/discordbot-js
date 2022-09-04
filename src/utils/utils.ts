import {ChatInputCommandInteraction, Collection, Guild, Role} from "discord.js";


const getRoles = (interaction: ChatInputCommandInteraction): Collection<string, Role> | null => {
    if (interaction.guild !== null) {
        return interaction.guild.roles.cache
            .sort((a, b) => b.position - a.position)
    } else {
        return null;
    }
}

const removeAllRolesBelow = (role: string, collection: Collection<string, Role>): Collection<string, Role> | null => {
    let ro = collection.filter(r => r.name == role).first();
    if (collection.filter(r => r.name == role).size !== 1) {
        return null;
    }
    if (ro !== undefined) {
        return collection.filter(r => r.position < ro!.position && r.name !== '@everyone')
    } else {
        return null;
    }
}

const isHexColor = (color: any): boolean => {
    return /^#[0-9A-F]{6}$/i.test(color);

}

const getRoleByName = (name: string, guild: Guild): Role | null => {
    let role = guild.roles.cache.find((value: Role, key: string, collection: Collection<string, Role>) => {
        return value.name === name;
    })
    if (role !== undefined) {
        return role;
    }
    return null;
}

const moveRoleBelow = async (newRole: Role, interaction: ChatInputCommandInteraction, role: Role): Promise<void> => {
    if (interaction.guild !== null) {

        let roles = interaction.guild.roles.cache
            .filter((value: Role, key: string, collection: Collection<string, Role>) => {
                return value.position < role.position;
            })
            .sort((a, b) => b.position - a.position);
        for (const r of roles.values()) {
            await r.setPosition(r.position - 1);
        }
        await newRole.setPosition(role.position - 1);
    }
}

export {
    getRoles,
    removeAllRolesBelow,
    isHexColor,
    getRoleByName,
    moveRoleBelow,
}