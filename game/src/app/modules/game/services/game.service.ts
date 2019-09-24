import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Player } from 'src/app/shared/interfaces/player.interface';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private database: AngularFireDatabase) {}

  searchPlayer(): Observable<Player[]> {
    return this.database.list<Player>('users').valueChanges();
  }

  generateGameId = () => this.database.createPushId();

  getCurrentGameId(userId: string): Observable<string> {
    return this.database
      .object<string>(`users/${userId}/gameId`)
      .valueChanges();
  }

  getPlayerTurn(userId: string): Observable<string> {
    return this.database
      .object<string>(`users/${userId}/gameId`)
      .valueChanges();
  }

  getGameData(gameId: string) {
    return this.database
      .object<number[]>(`games/${gameId}/gameData`)
      .valueChanges();
  }

  createGame(myId: string, opponentId: string, gameId: string) {
    this.database.object(`games/${gameId}`).update({
      gameData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      playerTurn: myId,
      playOne: myId,
      playTwo: opponentId
    });
  }

  setUserPlay(index: number, userId: string, gameId: string) {
    return this.database
      .object(`games/${gameId}/gameData/`)
      .update({ [index]: userId });
  }

  getPlayerRank() {
    return this.database
      .list<Player>('users')
      .valueChanges()
      .pipe(map(users => users.sort((a, b) => (a.score > b.score ? 1 : -1))));
  }
}
