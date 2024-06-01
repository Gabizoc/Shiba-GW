const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'help',
  description: 'Toutes les commandes disponible !',
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle(`Menu d'aide de ${client.user.username}`)
      .setColor('#f7ac3f')
      .setThumbnail('https://cdn.discordapp.com/attachments/1226510856796504094/1244694475708825752/a_1b44ffd8252c0681e00ea31ac86ceb9a.gif?ex=66560b90&is=6654ba10&hm=49a575b41c4227685f8e57d3f4e84d11e77f63aac6545782866a3ce880040640&')
      .setDescription('**Catégorie disponible :** \n\n <:Fleche:1244698310464241674> :tada: __Giveaway__\n <:Fleche:1244698310464241674> :gear: __Général__ \n\n*Développer par :* <@826133033069051954>')
      .setTimestamp()
      .setFooter({
        text: `Demandé par ${interaction.user.username} | ` + config.copyright,
        iconURL: interaction.user.displayAvatarURL()
      });

    const giveaway = new EmbedBuilder()
      .setColor('#f7ac3f')
      .setAuthor({ name: 'Categorie  » Giveaway', iconURL: 'https://media.discordapp.net/attachments/1226510856796504094/1245053073261330432/Design_sans_titre-removebg-preview.png?ex=66575988&is=66560808&hm=78e9673c3fd168c647f3d133d8943df81c4854eea6aac2d8663c16de02f06945&=&format=webp&quality=lossless' })
      .setThumbnail('https://cdn.discordapp.com/attachments/1226510856796504094/1244694475708825752/a_1b44ffd8252c0681e00ea31ac86ceb9a.gif?ex=66560b90&is=6654ba10&hm=49a575b41c4227685f8e57d3f4e84d11e77f63aac6545782866a3ce880040640&')
      .setDescription("**Voici les commandes de giveaway :**")
      .addFields(
        { name: 'Start', value: `Lancer un giveaway dans le serveur !\n**Usage :** <:slash:1245050181720997981>start`, inline: true },
        { name: 'Drop', value: `Lancer un drop dans le serveur !\n**Usage :** <:slash:1245050181720997981>drop`, inline: true },
        { name: 'Edit', value: `Modifier un giveaway !\n**Usage :** <:slash:1245050181720997981>edit`, inline: false },
        { name: 'End', value: `Finir un giveaway !\n**Usage :** <:slash:1245050181720997981>end`, inline: true },
        { name: 'List', value: `List tous les giveaway !\n**Usage :** <:slash:1245050181720997981>list`, inline: true },
        { name: 'Pause', value: `Mettre en pause un giveaway !\n**Usage :** <:slash:1245050181720997981>pause`, inline: false },
        { name: 'Reroll', value: `Relancer un giveaway \n**Usage :** <:slash:1245050181720997981>reroll`, inline: true },
        { name: 'Resume', value: `Reprendre un giveaway mit en pause !\n**Usage :** <:slash:1245050181720997981>resume`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `Demandé par ${interaction.user.username} | ` + config.copyright,
        iconURL: interaction.user.displayAvatarURL()
      });

    const general = new EmbedBuilder()
      .setColor('#f7ac3f')
      .setAuthor({ name: 'Categorie  » Général', iconURL: 'https://media.discordapp.net/attachments/1226510856796504094/1245053073261330432/Design_sans_titre-removebg-preview.png?ex=66575988&is=66560808&hm=78e9673c3fd168c647f3d133d8943df81c4854eea6aac2d8663c16de02f06945&=&format=webp&quality=lossless' })
      .setThumbnail('https://cdn.discordapp.com/attachments/1226510856796504094/1244694475708825752/a_1b44ffd8252c0681e00ea31ac86ceb9a.gif?ex=66560b90&is=6654ba10&hm=49a575b41c4227685f8e57d3f4e84d11e77f63aac6545782866a3ce880040640&')
      .setDescription("**Voici les commandes général du bot :**")
      .addFields(
        { name: 'Help', value: `Affiche toutes les commandes du bot !\n**Usage :** <:slash:1245050181720997981>help`, inline: true },
        { name: 'Invite', value: `Donne le lien d'invitation !\n**Usage :** <:slash:1245050181720997981>invite`, inline: true },
        { name: 'Ping', value: `Vérifiez la latence du bot !\n**Usage :** <:slash:1245050181720997981>ping`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `Demandé par ${interaction.user.username} | ` + config.copyright,
        iconURL: interaction.user.displayAvatarURL()
      });

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("help-menu")
          .setPlaceholder("Séléctionez une catégorie")
          .setDisabled(state)
          .addOptions([
            {
              label: `Giveaway`,
              value: `giveaway`,
              description: `Affiche toutes les commandes de giveaway`,
              emoji: `🎉`
            },
            {
              label: `Général`,
              value: `general`,
              description: `Affiche toutes les commandes général`,
              emoji: `⚙`
            }
          ])
      ),
    ];

    const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });

    const filter = i => i.user.id === interaction.user.id;

    const collector = initialMessage.createMessageComponentCollector({ filter, componentType: ComponentType.SelectMenu, time: 60000 });

    collector.on('collect', async i => {
      if (i.values[0] === 'giveaway') {
        await i.update({ embeds: [giveaway], components: components(false) });
      } else if (i.values[0] === 'general') {
        await i.update({ embeds: [general], components: components(false) });
      }
    });

    collector.on('end', (collected, reason) => {
      if (reason == "time") {
        initialMessage.edit({
          content: "Collector Destroyed, Try Again!",
          components: [],
        });
      }
    })
  }
}
