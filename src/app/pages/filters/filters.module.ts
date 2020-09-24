import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { FiltersComponent } from './filters.component';

const Routes_Array: Routes = [
	{ path: '', component: FiltersComponent }
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
		FiltersComponent
	],
	exports: [
		FiltersComponent
	]
})

export class FiltersModule {}