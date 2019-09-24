import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthenticateService } from 'src/app/shared/services/authenticate.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  public user$: Observable<firebase.User>;

  @Input() value: number;
  @Input() index: number;

  @Output('selecteIndex') selecteIndexEmmiter = new EventEmitter<number>();

  constructor(private authService: AuthenticateService) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  clickedIndex(value = this.value, index = this.index) {
    if (value !== 0) {
      return;
    }

    this.selecteIndexEmmiter.emit(index);
  }
}
