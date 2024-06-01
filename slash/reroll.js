const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "reroll",
    description: 'Relancer un Giveaway ',

    options: [
        {
            name: 'giveaway',
            description: 'Le giveaway à relancé (id du message)',
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

        const query = interaction.options.getString('giveaway');


        const giveaway =

            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||

            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);


        if (!giveaway) {
            return interaction.reply({
                content: '<a:error:1246140245104263268> Impossible de trouvé un giveaway avec `' + query + '`.',
                ephemeral: true
            });
        }

        if (!giveaway.ended) {
            return interaction.reply({
                content: `Ce giveaway : https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId} n'est pas encore terminé`,
                ephemeral: true
            });
        }


        client.giveawaysManager.reroll(giveaway.messageId)
        await interaction.reply({
                    content: `Ce giveaway : https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId} à été relancé!`,
                    ephemeral: true
                })
    }
};
