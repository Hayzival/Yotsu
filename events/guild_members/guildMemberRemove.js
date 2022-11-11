const dayjs = require('dayjs')
const {EmbedBuilder } = require('discord.js')

module.exports= {
    name: 'guildMemberRemove',
    once: false,
    async execute(client, member) {
        const embed = new EmbedBuilder()
        .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL:member.user.displayAvatarURL() })
        .setColor('#FF0000')
        .setDescription(`± Nom d'utilisateur: ${member.displayName}
            ± Crée le: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            ± Rejoint le: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            ± Quitté le: t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)
        `)
        .setTimestamp()
        .setFooter({ text: "L'utilisateur a quitté !"})
        const LogChannel = client.channels.cache.get('595560297167585283')
        LogChannel.send({ embeds: [embed]})
    } 
}