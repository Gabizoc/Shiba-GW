const Discord = require("discord.js")
const {  ApplicationCommandOptionType } = require("discord.js");
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
  name: 'start',
  description: 'Démarrer un giveaway',

  options: [
    {
      name: 'duration',
      description: 'Combien de temps doit t\'il durée ? Example : 1m, 1h, 1d',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'winners',
      description: 'Combien de gagnant doit t-il avoir ?',
      type: ApplicationCommandOptionType.Integer,
      required: true
    },
    {
      name: 'prize',
      description: 'Quel devrait être le prix du giveaway ?',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'channel',
      description: 'Le channel où lancé le giveawat',
      type: ApplicationCommandOptionType.Channel,
      required: true
    },
    {
      name: 'bonusrole',
      description: 'Rôle qui auront un bonus d\'entrée',
      type: ApplicationCommandOptionType.Role,
      required: false
    },
    {
      name: 'bonusamount',
      description: 'Le nombre d\'entrées bonus que le rôle recevra',
      type: ApplicationCommandOptionType.Integer,
      required: false
    },
    {
      name: 'invite',
      description: 'Invitation du serveur que vous souhaitez ajouter comme condition d\'adhésion au giveaway',
      type: ApplicationCommandOptionType.String,
      required: false
    },
    {
      name: 'role',
      description: 'Rôle que vous souhaitez ajouter comme condition d\'adhésion gratuite',
      type: ApplicationCommandOptionType.Role,
      required: false
    },
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has('ManageMessages') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.reply({
        content: '<a:error:1246140245104263268> Vous devez disposer des autorisations de gestion des messages pour lancer des giveaways.',
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('channel');
    const giveawayDuration = interaction.options.getString('duration');
    const giveawayWinnerCount = interaction.options.getInteger('winners');
    const giveawayPrize = interaction.options.getString('prize');

    if (!giveawayChannel.isTextBased()) {
      return interaction.reply({
        content: '<a:error:1246140245104263268> Merci de séléctioné un channel !',
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: '<a:error:1246140245104263268> Merci de sélectionner une durée valide',
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: '<a:error:1246140245104263268> Veuillez sélectionner un nombre de gagnants valide ! Supérieur ou égal à un.',
      })
    }

    const bonusRole = interaction.options.getRole('bonusrole')
    const bonusEntries = interaction.options.getInteger('bonusamount')
    let rolereq = interaction.options.getRole('role')
    let invite = interaction.options.getString('invite')

    if (bonusRole) {
      if (!bonusEntries) {
        return interaction.reply({
          content: `<a:error:1246140245104263268> Vous devez spécifier combien d'entrées bonus le rôle ${bonusRole} recevra !`,
          ephemeral: true
        });
      }
    }


    await interaction.deferReply({ ephemeral: true })
    let reqinvite;
    if (invite) {
      let invitex = await client.fetchInvite(invite)
      let client_is_in_server = client.guilds.cache.get(
        invitex.guild.id
      )
      reqinvite = invitex
      if (!client_is_in_server) {
          const gaEmbed = {
            author: {
              name: client.user.username,
              iconURL: client.user.displayAvatarURL() 
            },
            title: "Chek Serveur",
            description:
              "Je vois que c'est un nouveau serveur,vous devez m'inviter là-bas pour définir cela comme une exigence !",
            timestamp: new Date(),
            footer: {
              iconURL: client.user.displayAvatarURL(),
              text: "Chek Serveur"
            }
          }  
        return interaction.editReply({ embeds: [gaEmbed]})
      }
    }

    if (rolereq && !invite) {
      messages.inviteToParticipate = `**Réagissez avec 🎉 pour participer !**\n>>> - Seuls les membres ayant ${rolereq} sont autorisés à participer à ce concours !`
    }
    if (rolereq && invite) {
      messages.inviteToParticipate = `**Réagissez avec 🎉 pour participer !**\n>>> - Seuls les membres ayant ${rolereq} sont autorisés à participer à ce concours !\n - Les membres doivent rejoindre [ce serveur](${invite}) pour participer à ce concours !`
    }
    if (!rolereq && invite) {
      messages.inviteToParticipate = `**Réagissez avec 🎉 pour participer !**\n>>> - Les membres doivent rejoindre [ce serveur](${invite}) pour participer à ce concours !`
    }



    client.giveawaysManager.start(giveawayChannel, {

      duration: ms(giveawayDuration),

      prize: giveawayPrize,

      winnerCount: parseInt(giveawayWinnerCount),

      hostedBy: client.config.hostedBy ? interaction.user : null,

      bonusEntries: [
        {

          bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
          cumulative: false
        }
      ],

      messages,
      extraData: {
        server: reqinvite == null ? "null" : reqinvite.guild.id,
        role: rolereq == null ? "null" : rolereq.id,
      }
    });
    interaction.editReply({
      content:
        `<a:valid:1246133302558064740> Giveaway lancé dans ${giveawayChannel} !`,
      ephemeral: true
    })

    if (bonusRole) {
      let giveaway = new Discord.EmbedBuilder()
        .setAuthor({ name: `Alerte de bonus d'entré !` })
        .setDescription(
          `**${bonusRole}** à **${bonusEntries}** entrées bonus pour ce concours !`
        )
        .setColor("#f7ac3f")
        .setTimestamp();
      giveawayChannel.send({ embeds: [giveaway] });
    }

  }

};
