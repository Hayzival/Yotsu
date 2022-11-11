const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'La commande ping renvoie la latence du bot et de l\'API',
    runSlash: (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })

        interaction.reply({embeds: [embed]})
    } 
};  