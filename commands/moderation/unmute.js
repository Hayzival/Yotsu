const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'unmute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'unmute [@membre]',
    examples: ['unmute @Hayzival'],
    description: 'Demute un membre du serveur',
    options: [
        {
            name: 'membre',
            description: 'Membre à mute',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    async runInteraction(client, interaction) {
        const member = interaction.options.getUser('membre')
        
        if (!member) return interaction.reply({ content: 'Veuillez fournir un membre', ephemeral: true })

        const memberTarget = interaction.guild.members.cache.get(member.id)
        memberTarget.timeout(null)
        interaction.reply({ content: `${memberTarget} a été unmute du serveur`, ephemeral: true })
    }
}