import * as functions from 'firebase-functions';

import Game from '../service/game';

export const listenGameData = functions.database
  .ref('games/{gameId}')
  .onUpdate(async (change, context) => {
    const game = change.after.val();
    const userIdWinner = Game.verifyWinner(game.gameData);

    if (userIdWinner) {
      console.log(userIdWinner);

      await change.after.ref.root
        .child(`users/${userIdWinner}`)
        .update({ userScore: 3 });
    }

    return change;
  });
