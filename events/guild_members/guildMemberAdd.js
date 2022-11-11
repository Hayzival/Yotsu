const { EmbedBuilder } = require('discord.js')

module.exports= {
  name: 'guildMemberAdd',
  once: false,
  async execute(client, member) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL:member.user.displayAvatarURL() })
      .setColor('#00FF00')
      .setDescription(`± Nom d'utilisateur: ${member}
      ± Crée le: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
      ± Rejoint le: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
      `)
      .setTimestamp()
      .setFooter({ text: "L'utilisateur a rejoint !"})
    const LogChannel = client.channels.cache.get('595560297167585283')
    LogChannel.send({ embeds: [embed]})
  }
}