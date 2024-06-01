const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "resume",
    description: 'Relancer un giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'Le giveaway a relancé (id du message)',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction) => {


        if (!interaction.member.permissions.has('ManageMessages') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: '<a:error:1246140245104263268> Vous devez disposer des autorisations de gestion des messages pour lancer des giveaways..',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('giveaway');


        const giveaway =

            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||

            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);


        if (!giveaway) {
            return interaction.reply({
                content: '<a:error:1246140245104263268> Impossible de trouvé le giveaway avec `' + query + '`.',
                ephemeral: true
            });
        }

        if (!giveaway.pauseOptions.isPaused) {
            return interaction.reply({
                content: `Ce giveaway (https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) n'est pas en pause !`,
                ephemeral: true
            });
        }


        client.giveawaysManager.unpause(giveaway.messageId)

            .then(() => {

                interaction.reply({ content:`Ce giveaway (https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) est relancé !`, ephemeral: true });
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};
