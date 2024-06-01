module.exports = (client, interaction) => {
    if (interaction.isCommand()) {

    const command = client.interactions.get(interaction.commandName);

    if (!command) return interaction.reply({
      content: "<a:error:1246140245104263268> Quelque chose s'est mal passé ! | Peut-être que la commande n'est pas enregistrée ?",
      ephemeral: true
    });

    command.run(client, interaction);
  }
}