import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { BlockComponent } from './components/block/block.component';
import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [BlockComponent, HomeComponent, HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GameRoutingModule,
    NgZorroAntdModule
  ]
})
export class GameModule {}
