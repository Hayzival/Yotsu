const { ActivityType } = require('discord.js')
const Logger = require('../../utils/Logger')

module.exports= {
    name: 'ready',
    once: true,
    async execute(client) {                

        let guildsCount = await client.guilds.fetch()
        let usersCount = await client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)

        Logger.client(`- Je suis prêt à exterminé les ${usersCount} utilisateurs de discord sur les ${guildsCount.size} serveurs !`)

        client.user.setPresence({
            status: 'online',
            activity: {
                name: 'Exterminer les utilisateurs de discord',
                type: ActivityType.WATCHING
            }
        })

        const devGuild = await client.guilds.cache.get('595272575060279316')
        devGuild.commands.set(client.commands.map(cmd => cmd))
    }
}