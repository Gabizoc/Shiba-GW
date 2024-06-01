const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Montre le ping',
    run: async (client, interaction) => {
      let pembed = new EmbedBuilder()
		  .setColor('#f7ac3f')	
		  .setTitle('Ping du bot')
      .setThumbnail('https://cdn.discordapp.com/attachments/1226510856796504094/1244694475708825752/a_1b44ffd8252c0681e00ea31ac86ceb9a.gif?ex=66560b90&is=6654ba10&hm=49a575b41c4227685f8e57d3f4e84d11e77f63aac6545782866a3ce880040640&')
		  .addFields({ name: '**Latence**', 
                   value: `\`${Date.now() - interaction.createdTimestamp}ms\``
                 })
		  .addFields({ name: '**Latence de l\'API **', 
                   value: `\`${Math.round(client.ws.ping)}ms\``
                 })
		  .setTimestamp()
                  .setFooter({
                     text: `${interaction.user.username}`,
                     iconURL: interaction.user.displayAvatarURL()
                  })
        interaction.reply({
          embeds: [pembed]
        });
    },
};
