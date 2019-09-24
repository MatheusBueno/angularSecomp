import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Player } from 'src/app/shared/interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminGameService {
  constructor(
    private database: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {
    // this.createUser();
  }

  createUser() {
    {
      return this.database.object(`users/OWBuCUwh6PcWXsoYz6sWmtNWcri2`).update({
        isAvailable: true,
        score: 0
      });
    }
  }

  updateUserWithCreatedGame(userId: string, gameId: string) {
    return this.database
      .object<Player>(`users/${userId}`)
      .update({ gameId, isAvailable: false });
  }
}
