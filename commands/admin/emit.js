module.exports = {
    name: 'emit',
    description: 'Emettre un évènement de votre choix',
    permissions: ['ADMINISTRATOR'],
    options: [{
        name: 'event',
        description: 'Choisir un événement à émettre',
        type: 3,
        required: true,
        choices: [{
            name:'guildMemberAdd',
            value: 'guildMemberAdd'
        },
        {
            name: 'guildMemberRemove',
            value: 'guildMemberRemove'
        }]
    }],
    runInteraction(client, interaction) {
        const evtChoices = interaction.options.getString('event')

        if (evtChoices == 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({ content: 'Event guildMemberAdd émit', ephemeral: true})
        } else {
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({ content: 'Event guildMemberRemove émit', ephemeral: true})
        }
    }
}