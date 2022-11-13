const { ApplicationCommandType } = require('discord.js')

module.exports = {
    name: 'thread',
    category: 'thread',
    permissions: ['MANAGE_THREADS'],
    ownerOnly: false,
    usage: 'thread [join|leave|archive|unarchive|delete]',
    examples: ['thread join', 'thread leave'],
    description: 'Permet de gérer les threads',
    options: [
        {
            name: 'join',
            description: 'Rejoindre un thread',
            type: 1,
        },
        {
            name: 'leave',
            description: 'Quitter un thread',
            type: 1,
        },
        {
            name: 'archive',
            description: 'Archiver un thread',
            type: 1,
        },
        {
            name: 'unarchive',
            description: 'Désarchiver un thread',
            type: 1,
        },
        {
            name: 'delete',
            description: 'Supprimer un thread',
            type: 1,
        },
    ],
    async runInteraction(client, interaction) {
        let thread = interaction.channel
        if (!thread.isThread()) return interaction.reply({ content: 'Vous devez être dans un thread pour utiliser cette commande', ephemeral: true })

        if (interaction.options.getSubcommand() == 'join') {
            if (thread.joinable) {
                await thread.join()
                interaction.reply({ content: 'Le bot a rejoint le thread', ephemeral: true })
            } else {
                interaction.reply({ content: 'Le bot ne peut pas rejoindre le thread', ephemeral: true })
            }
        } else if (interaction.options.getSubcommand() == 'leave') {
            await thread.leave()
            interaction.reply({ content: 'Le bot a quitté le thread', ephemeral: true })
        } else if (interaction.options.getSubcommand() == 'archive') {
            if (thread.archivable) {
                await thread.setArchived(true)
                interaction.reply({ content: 'Le thread a été archivé', ephemeral: true })
            } else {
                interaction.reply({ content: 'Le thread ne peut pas être archivé', ephemeral: true })
            }
        } else if (interaction.options.getSubcommand() == 'unarchive') {
            await thread.setArchived(false)
            interaction.reply({ content: 'Le thread a été désarchivé', ephemeral: true })
        } else if (interaction.options.getSubcommand() == 'delete') {
            const channelID = thread.parentId
            const LogChannel = client.channels.cache.get(channelID)
            await LogChannel.send(`Le bot à supprimé le thread ${thread.name}`)
            await thread.delete()
        }

    }
};  