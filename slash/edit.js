const { ApplicationCommandOptionType } = require('discord.js');
const ms = require("ms");

module.exports = {
  name: 'edit',
  description: 'Modifié un giveaway',

  options: [
    {
      name: 'giveaway',
      description: 'Le giveaway à terminé (ID du message)',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'duration',
      description: 'Heure de réglage du cadeau mentionné. ex : 1h = le giveaway se termine après une heure !',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'winners',
      description: 'Combien de gagnant voulez-vous ?',
      type: ApplicationCommandOptionType.Integer,
      required: true
    },
    {
      name: 'prize',
      description: 'Le prix à gagné',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],

  run: async (client, interaction) => {


    if (!interaction.member.permissions.has('ManageMessages') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.reply({
        content: '<a:error:1246140245104263268> Vous devez disposer des autorisations de gestion des messages pour lancer des giveaways.',
        ephemeral: true
      });
    }
    const gid = interaction.options.getString('giveaway');
    const time = interaction.options.getString('duration');
    const winnersCount = interaction.options.getInteger('winners');
    const prize = interaction.options.getString('prize');
    let duration;
    if (time.startsWith("-")) {
      duration = -ms(time.substring(1));
    } else {
      duration = ms(time);
    }

    if (isNaN(duration)) {
      return interaction.reply({
        content: "<a:error:1246140245104263268> Merci de sélectionner une durée valide !",
        ephemeral: true,
      });
    }
    await interaction.deferReply({
      ephemeral: true
    })

    try {
      await client.giveawaysManager.edit(gid, {
        newWinnerCount: winnersCount,
        newPrize: prize,
        addTime: time
      })
    } catch (e) {
      return interaction.editReply({
        content:
          `<a:error:1246140245104263268> Impossible de trouver le giveaway associé à cette id : \`${gid}\``,
        ephemeral: true
      });
    }
    interaction.editReply({
      content:
        `<a:valid:1246133302558064740> Ce giveaway à bien été modifié !`,
      ephemeral: true
    });
  }

};
