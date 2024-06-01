const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'list',
  description: 'List tous les giveaway en cours',
  run: async (client, interaction) => {
    let giveaways = client.giveawaysManager.giveaways.filter(
      (g) => g.guildId === `${interaction.guild.id}` && !g.ended
    );
    if (!giveaways.some((e) => e.messageId)) {
      return interaction.reply({
          content: '<a:error:1246140245104263268> Aucun giveaway à afficher !',
          ephemeral: true
        });
    }
    
    let embed = new Discord.EmbedBuilder()
      .setColor('#f7ac3f')
      .setAuthor({ name: 'Giveaway actuellement actifs', iconURL: 'https://media.discordapp.net/attachments/1226510856796504094/1245053073261330432/Design_sans_titre-removebg-preview.png?ex=66575988&is=66560808&hm=78e9673c3fd168c647f3d133d8943df81c4854eea6aac2d8663c16de02f06945&=&format=webp&quality=lossless' })
      .setThumbnail('https://cdn.discordapp.com/attachments/1226510856796504094/1244694475708825752/a_1b44ffd8252c0681e00ea31ac86ceb9a.gif?ex=66560b90&is=6654ba10&hm=49a575b41c4227685f8e57d3f4e84d11e77f63aac6545782866a3ce880040640&')
      .setFooter({
          text: `Demandé par ${interaction.user.username} | ` + config.copyright,
          iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp();

    await interaction.deferReply();

    await Promise.all(
      giveaways.map(async (x) => {
        embed.addFields({ name:
          `Giveaway:`, value: `**Prix :** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})\nLancé à :** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Fini dans :** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`
        });
      })
    );

    interaction.editReply({ embeds: [embed] });
  },
};
