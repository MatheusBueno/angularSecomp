import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  public user$: Observable<firebase.User>;

  constructor(
    private database: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {
    this.user$ = auth.authState;
  }

  async login(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  async register(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  async setUserInList({ uid, email }) {
    return this.database.object(`users/${uid}`).update({
      user: uid,
      score: 0,
      email
    });
  }

  logout() {
    return this.auth.auth.signOut();
  }
}
