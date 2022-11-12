const { EmbedBuilder, ApplicationCommandOptionType} = require('discord.js')
const { readdirSync } = require('fs')
const commandFolder = readdirSync('./commands')
const prefix = '!'

const contextDescription = {
  userinfo: 'Renvoie des informations sur l\'utilisateur'
}

module.exports = {
    name: 'help',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'help <command>',
    examples: ['help', 'help ping', 'help emit'],
    description: 'Renvoie une liste de commande filtrée par catégorie',
    options: [
      {
        name: 'command',
        description: 'La commande que vous voulez voir',
        type: ApplicationCommandOptionType.String,
        required: false
      }
    ],
    runInteraction(client, interaction) {
      const cmdName = interaction.options.getString('command')
  
      if (!cmdName) {
        const noArgsEmbed = new EmbedBuilder()
          .setColor('White')
          .addFields([{ name:'Liste des commandes', value:`Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``}])
        
        for (const category of commandFolder) {
          noArgsEmbed.addFields([{
            name: `• ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
            value: `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
          }])
        }
  
        return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true})
      } else {
        const cmd = client.commands.get(cmdName)
        if (!cmd) return interaction.reply({ content:"Cette commande n'existe pas", ephemeral: true})
  
        return interaction.reply({content:`
          \`\`\`makefile
[Help: Command -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Admin only /!\\\n' : '\n'}
${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}
Permissions: ${cmd.permissions.join(', ')}

---

${prefix} = prefix à utiliser sur le bot (/commands sont aussi disponibles)
{} = sous-commande(s) disponible | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
\`\`\``, ephemeral: true})
      }
    }
};  