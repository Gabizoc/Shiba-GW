const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : ""),
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : ""),
  drawing:  `Fini dans : **{timestamp}**`,
  inviteToParticipate: `Prix : **{this.prize}**\nRéagis avec 🎉 pour participer !`,
  winMessage: "Félicitation, {winners}! Tu gagnes **{this.prize}**!",
  embedFooter: "{this.winnerCount} gagnant(s)",
  noWinner: "Giveaway annulé, auccun participant valide !",
  hostedBy: "Lancé par : {this.hostedBy}",
  winners: "Gagnant(s)",
  endedAt: "Fini dans :"
}
