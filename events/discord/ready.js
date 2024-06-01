const register = require('../../utils/slashsync');
const { ActivityType } = require('discord.js');

module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: '1'
  })), {
    debug: true
  });
  
  console.log(`[ / | Slash Command ] - ✅ Toutes les commandes slash chargé !`)
  console.log(`[STATUS] ${client.user.tag} est en ligne !`);
  client.user.setPresence({
  activities: [{ name: `.gg/shibagw`, type: ActivityType.Watching }],
  status: 'online',
});

};
