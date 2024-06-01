const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'invite',
    description: 'Invite le bot à ton serveur !',
    run: async (client, interaction) => {
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`Invite ${client.user.username}`)
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=274878318657&scope=applications.commands%20bot`)
        .setEmoji('<:add:1246435616971817020>'),
        new ButtonBuilder()
        .setLabel('Shiba GW')
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.gg/skGXPAegmj")
        .setEmoji('<:cadeau2:1245050933654720512>'),
    )
    let invite = new EmbedBuilder()
      .setAuthor({ 
          name: `Invite ${client.user.username}`, 
          iconURL: client.user.displayAvatarURL() 
      })    
    .setTitle("Invite & Serveur GW")
    .setThumbnail('https://cdn.discordapp.com/attachments/1226510856796504094/1244694475708825752/a_1b44ffd8252c0681e00ea31ac86ceb9a.gif?ex=66560b90&is=6654ba10&hm=49a575b41c4227685f8e57d3f4e84d11e77f63aac6545782866a3ce880040640&')
    .setDescription(`> <:add:1246435616971817020> Invite ${client.user} dans ton serveur et créé des giveaway !\n> \n> <:cadeau2:1245050933654720512> Rejoint Shiba GW et essaye de gagné des récompenses !`)
    .setColor('#f7ac3f')
    .setTimestamp()
    .setFooter({
        text: `Demandé par ${interaction.user.username} | ` + config.copyright,
        iconURL: interaction.user.displayAvatarURL()
    })
    
    interaction.reply({ embeds: [invite], components: [row]});
}
}
