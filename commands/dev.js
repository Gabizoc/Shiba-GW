const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');
const tonID = "826133033069051954";

module.exports.run = async (client, message, args) => {
    if (message.author.id !== tonID) return;

    let invite = new EmbedBuilder()
        .setAuthor({ name: 'Categorie  » Spéciale', iconURL: 'https://media.discordapp.net/attachments/1226510856796504094/1245053073261330432/Design_sans_titre-removebg-preview.png?ex=66575988&is=66560808&hm=78e9673c3fd168c647f3d133d8943df81c4854eea6aac2d8663c16de02f06945&=&format=webp&quality=lossless' })
        .setDescription("**Voici la zone de test :**\n\n**Test Emoji :**\n<a:error:1246140245104263268> |  <:slash:1245050181720997981>  | <:cadeau:1245050932102828042> | <a:valid:1246133302558064740> | <:add:1246435616971817020> |")
        .setColor('#f7ac3f')
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/1226510856796504094/1244694475708825752/a_1b44ffd8252c0681e00ea31ac86ceb9a.gif?ex=66560b90&is=6654ba10&hm=49a575b41c4227685f8e57d3f4e84d11e77f63aac6545782866a3ce880040640&')
        .setFooter({
            text: `Demandé par ${client.user.username} | ` + config.copyright,
            iconURL: client.user.displayAvatarURL()
        });

    message.reply({ embeds: [invite] });
}
