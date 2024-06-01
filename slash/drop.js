
const {  ApplicationCommandOptionType } = require('discord.js');
const messages = require("../utils/message");
module.exports = {
    name: 'drop',
    description: 'Créé un drop',
    options: [
        {
            name: 'winners',
            description: 'Combien de gagnant voulez-vous ?',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'prize',
            description: 'Le prix a gagné',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'channel',
            description: 'Le channel où lancer le giveaway',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],

    run: async (client, interaction) => {

        if(!interaction.member.permissions.has('ManageMessages') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({
                content: '<a:error:1246140245104263268> Vous devez disposer des autorisations de gestion des messages pour lancer des giveaways.',
                ephemeral: true
            });
        }

        const giveawayChannel = interaction.options.getChannel('channel');
        const giveawayWinnerCount = interaction.options.getInteger('winners');
        const giveawayPrize = interaction.options.getString('prize');
      
    if (!giveawayChannel.isTextBased()) {
      return interaction.reply({
        content: '<a:error:1246140245104263268> Merci de sélectionner un channel !',
        ephemeral: true
      });
    }   
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: '<a:error:1246140245104263268> Veuillez sélectionner un nombre de gagnants valide ! Supérieur ou égal à un.',
        ephemeral: true
      })
    }


        client.giveawaysManager.start(giveawayChannel, {

            winnerCount: giveawayWinnerCount,

            prize: giveawayPrize,

            hostedBy: client.config.hostedBy ? interaction.user : null,

            isDrop: true,


        });

        await interaction.reply({
          content: `<a:valid:1246133302558064740> Giveaway lancé dans ${giveawayChannel} !`,
          ephemeral: true
        })

    }
};
