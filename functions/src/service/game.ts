interface IGameBoard {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
}

class Game {
  verifyWinner(gameBoard: IGameBoard) {
    const one = gameBoard[0];
    const two = gameBoard[1];
    const three = gameBoard[2];
    const four = gameBoard[3];
    const five = gameBoard[4];
    const six = gameBoard[5];
    const seven = gameBoard[6];
    const eight = gameBoard[7];
    const nine = gameBoard[8];

    // Verify lines
    if (one === two && two === three) {
      return one;
    } else if (four === five && five === six) {
      return four;
    } else if (seven === eight && eight === nine) {
      return seven;
    }

    // Verify columns
    else if (one === four && four === seven) {
      return one;
    } else if (two === five && five === eight) {
      return two;
    } else if (three === six && six === nine) {
      return three;
    }

    // Verify diagonal
    else if (one === five && five === nine) {
      return one;
    } else if (three === five && five === seven) {
      return three;
    } else {
      return undefined;
    }
  }
}

export default new Game();
