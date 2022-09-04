import {ChatInputCommandInteraction, Collection, Role} from "discord.js";


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

export {
    getRoles,
    removeAllRolesBelow,
    isHexColor,
}