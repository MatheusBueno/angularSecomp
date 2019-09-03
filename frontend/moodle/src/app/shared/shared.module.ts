import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [],
  imports: [
    NgZorroAntdModule,
    CommonModule
  ],
  exports: [
    NgZorroAntdModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
