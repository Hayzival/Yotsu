const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'ban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@membre] [raison]',
    examples: ['ban @Hayzival Spam'],
    description: 'Bannit un membre du serveur',
    options: [
        {
            name: 'membre',
            description: 'Membre à bannir',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'raison',
            description: 'Raison du ban',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async runInteraction(client, interaction) {
        const member = interaction.options.getUser('membre')
        const reason = interaction.options.getString('raison') || 'Aucune raison fournie'

        const memberTarget = interaction.guild.members.cache.get(member.id)
        if (!memberTarget.bannable) return interaction.reply({ content: 'Je ne peux pas bannir ce membre', ephemeral: true })

        memberTarget.ban(reason)
        interaction.reply({ content: `${memberTarget} a été bannit du serveur pour la raison suivante: ${reason}`, ephemeral: true })
    }
}