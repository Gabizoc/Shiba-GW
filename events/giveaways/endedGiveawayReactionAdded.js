const Discord = require('discord.js');
module.exports = {
  async execute(giveaway, member, reaction) {
    reaction.users.remove(member.user);
    member.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle(`Le concours est déjà terminé !`)
            .setColor('#f7ac3f')
            .setThumbnail('https://cdn.discordapp.com/attachments/1226510856796504094/1244694475708825752/a_1b44ffd8252c0681e00ea31ac86ceb9a.gif?ex=66560b90&is=6654ba10&hm=49a575b41c4227685f8e57d3f4e84d11e77f63aac6545782866a3ce880040640&')
            .setDescription(
              `<a:error:1246140245104263268> Hey ${member.user} **[[ce giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** est déjà fini ! :sob:\nSoyez rapide la prochaine fois !`
            )
            .setTimestamp(),
        ],
      })
      .catch((e) => {});
  },
};
