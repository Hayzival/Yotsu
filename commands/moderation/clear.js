const { ApplicationCommandOptionType } = require("discord.js");


module.exports = {
    name: 'clear',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [nombre] <@membre>',
    examples: ['clear 10', 'clear 10 @Hayzival'],
    description: 'Supprime un nombre de messages spécifié dans un salon',
    options: [
        {
            name: 'nombre',
            description: 'Nombre de messages à supprimer',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'membre',
            description: 'Membre dont les messages seront supprimés',
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    async runInteraction(client, interaction) {
        const amount = interaction.options.getInteger('nombre')
        if (amount < 1 || amount > 100) return interaction.reply({ content: 'Veuillez choisir un nombre entre 1 et 100', ephemeral: true })
        const member = interaction.options.getUser('membre')

        const messageADelete = await interaction.channel.messages.fetch({ limit: amount })

        if (member) {
            const messageToDelete = messageADelete.filter(message => message.author.id === member.id)
            await interaction.channel.bulkDelete(messageToDelete, true)
            await interaction.reply({ content: `Suppression de ${messageToDelete.size} messages de ${member}`, ephemeral: true })
        } else {
            await interaction.channel.bulkDelete(messageADelete, true)
            await interaction.reply({ content: `Suppression de ${amount} messages`, ephemeral: true })
        }
    }
}