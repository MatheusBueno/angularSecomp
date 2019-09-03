import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    NgZorroAntdModule,
    CommonModule
  ],
  exports: [
    NgZorroAntdModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
