module.exports= {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const cmd = client.commands.get(interaction.commandName)
            if (!cmd) return interaction.reply("Cette commande n'existe pas")

            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `Vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour taper cette commande !`, ephemeral: true})
            
            cmd.runInteraction(client, interaction);
        } else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId)
            if (!btn) return interaction.reply("Ce bouton n'existe pas")
            btn.run(client, interaction);
        } else if (interaction.isSelectMenu()) {
            const select = client.selects.get(interaction.customId)
            if (!select) return interaction.reply("Ce select n'existe pas")
            select.run(client, interaction);
        }
    }
}
