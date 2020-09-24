import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { CarouselComponent } from './carousel.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const Routes_Array: Routes = [
	{ path: '', component: CarouselComponent }
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
		AddEditComponent,
		CarouselComponent
	],
	exports: [
		CarouselComponent
	]
})

export class CarouselModule {}