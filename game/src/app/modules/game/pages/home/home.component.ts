import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { AdminGameService } from './../../../../admin/services/game.service';
import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public modalLoginIsVisible: boolean = false;
  public isLoading: boolean = false;
  public loginForm: FormGroup;
  private gameId$: Observable<string>;
  public gameData$: Observable<number[]>;

  constructor(
    private authService: AuthenticateService,
    private gameService: GameService,
    private admin: AdminGameService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.loginForm = this.initializeForm();

    const user = await this.authService.user$.pipe(take(1)).toPromise();
    this.gameId$ = this.gameService.getCurrentGameId(user.uid);
    console.log(user);
    user;

    const gameId = await this.gameId$.pipe(take(1)).toPromise();
    if (gameId) {
      console.log(gameId);
      this.gameData$ = this.gameService.getGameData(gameId);
    }

    this.gameService.searchPlayer().subscribe(players => {
      const availablePlayer = players.find(player => player.isAvailable);
      console.log('player ', availablePlayer);

      if (availablePlayer) {
        const gameId = this.gameService.generateGameId();

        this.gameService.createGame(user.uid, availablePlayer.user, gameId);
        this.admin.updateUserWithCreatedGame(user.uid, gameId);
        this.admin.updateUserWithCreatedGame(availablePlayer.user, gameId);
      }
    });
  }

  private initializeForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async userSelectIndex(indexSelected: number) {
    const user = await this.authService.user$.pipe(take(1)).toPromise();
    const gameId = await this.gameId$.pipe(take(1)).toPromise();

    try {
      await this.gameService.setUserPlay(indexSelected, user.uid, gameId);
    } catch (error) {
      console.log(error);
    }
  }

  openModal() {
    this.modalLoginIsVisible = true;
  }

  handleLogin(form: FormGroup, isLogin: boolean) {
    if (form.invalid) {
      for (const i in form.controls) {
        form.controls[i].markAsDirty();
        form.controls[i].updateValueAndValidity();
      }
      return;
    }
    const { email, password } = form.getRawValue();

    this.isLoading = true;

    isLogin ? this.login(email, password) : this.register(email, password);
  }

  private async login(email: string, password: string) {
    try {
      await this.authService.login(email, password);

      this.modalLoginIsVisible = false;
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  private async register(email: string, password: string) {
    try {
      const { user } = await this.authService.register(email, password);

      await this.authService.setUserInList(user);
      this.modalLoginIsVisible = false;
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
