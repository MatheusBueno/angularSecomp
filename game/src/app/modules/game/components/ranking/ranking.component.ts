import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Player } from 'src/app/shared/interfaces/player.interface';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  public playerRank$: Observable<Player[]>;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.playerRank$ = this.gameService.getPlayerRank();
  }
}
