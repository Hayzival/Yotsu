const { EmbedBuilder, ApplicationCommandType } = require('discord.js')

module.exports = {
    name: 'userinfo',
    category: 'contextuel',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'userinfo',
    examples: ['userinfo'],
    type: ApplicationCommandType.User,
    async runInteraction(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId)
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://cdn.discordapp.com/attachments/737385360186933288/949754186877255790/1f916.png' : 'https://cdn.discordapp.com/attachments/737385360186933288/949754471519506492/1f9d1.png' })
            .setColor('#8e48f7')  
            .setImage(member.user.displayAvatarURL())
            .addFields(
                { name: 'Nom', value: `${member.displayName}`, inline: true},
                { name: 'Modérateur', value: `${member.kickable ? '🔴' : '🟢'}`, inline: true},
                { name: 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true},
                { name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', ' ')}`},
                { name: 'A créé son compte le', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`},
                { name: 'A rejoint le serveur le', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`}
            )
        interaction.reply({ embeds: [embed], ephemeral: true})
    }  
}   