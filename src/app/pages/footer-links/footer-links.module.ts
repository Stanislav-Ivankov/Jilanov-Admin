import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { FooterLinksComponent } from './footer-links.component';

const Routes_Array: Routes = [
	{ path: '', component: FooterLinksComponent }
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(Routes_Array)
	],
	declarations: [
		FooterLinksComponent
	],
	exports: [
		FooterLinksComponent
	]
})

export class FooterLinksModule {}