import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
	  AppComponent
	],
  imports: [
	  BrowserAnimationsModule,
	  CommonModule,
	  CoreModule,
	  routing,
	  SharedModule,
	],
  providers: [],
  bootstrap: [
	  AppComponent
	]
})

export class AppModule {}