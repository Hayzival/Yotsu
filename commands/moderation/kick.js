const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'kick',
    category: 'moderation',
    permissions: ['KICK_MEMBERS'],
    ownerOnly: false,
    usage: 'kick [@membre] [raison]',
    examples: ['kick @Hayzival Spam'],
    description: 'Expulse un membre du serveur',
    options: [
        {
            name: 'membre',
            description: 'Membre à expulser',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'raison',
            description: 'Raison de l\'expulsion',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async runInteraction(client, interaction) {
        const member = interaction.options.getUser('membre')
        const reason = interaction.options.getString('raison') || 'Aucune raison fournie'

        const memberTarget = interaction.guild.members.cache.get(member.id)
        if (!memberTarget.kickable) return interaction.reply({ content: 'Je ne peux pas expulser ce membre', ephemeral: true })

        memberTarget.kick(reason)
        interaction.reply({ content: `${memberTarget} a été expulsé du serveur pour la raison suivante: ${reason}`, ephemeral: true })
    }
}