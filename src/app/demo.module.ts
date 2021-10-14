import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from '@c/root/root.component';
import { MenuModule } from '@c/shared/menu/menu.module';
import { DemoToastComponent } from '@c/shared/toast/toast.component';
import { DemoDataModule } from '@data/data.module';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { ToastrModule } from 'ngx-toastr';

import { DemoRoutingModule } from './demo-routing.module';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      toastComponent: DemoToastComponent,
    }),
    NgProgressModule,
    NgProgressHttpModule,
    DemoRoutingModule,
    DemoDataModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class DemoModule {}
