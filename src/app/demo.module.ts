import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootComponent } from '@c/root/root.component';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

import { DemoRoutingModule } from './demo-routing.module';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    NgProgressModule,
    NgProgressHttpModule,
    DemoRoutingModule,
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class DemoModule {}
