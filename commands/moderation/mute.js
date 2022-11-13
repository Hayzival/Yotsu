const { ApplicationCommandOptionType } = require("discord.js");
const ms = require('ms')

module.exports = {
    name: 'mute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'mute [@membre] [durée] [raison]',
    examples: ['mute @Hayzival 4m Spam'],
    description: 'mute un membre du serveur temporairement',
    options: [
        {
            name: 'membre',
            description: 'Membre à mute',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'duree',
            description: 'Temps de mute',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'raison',
            description: 'Raison du mute',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async runInteraction(client, interaction) {
        const member = interaction.options.getUser('membre')
        const duree = interaction.options.getString('duree')
        const convertedDuree = ms(duree)
        const reason = interaction.options.getString('raison') || 'Aucune raison fournie'

        const memberTarget = interaction.guild.members.cache.get(member.id)
        if (!memberTarget.moderatable) return interaction.reply({ content: 'Je ne peux pas mute ce membre', ephemeral: true })
        if (!convertedDuree) return interaction.reply({ content: 'Veuillez fournir une durée valide', ephemeral: true })

        memberTarget.timeout(convertedDuree,reason)
        interaction.reply({ content: `${memberTarget} a été mute du serveur pour la raison suivante: ${reason}`, ephemeral: true })
    }
}