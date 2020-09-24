import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { SubCategoriesComponent } from './sub-categories.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const Routes_Array: Routes = [
	{ path: '', component: SubCategoriesComponent }
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
		SubCategoriesComponent
	],
	exports: [
		SubCategoriesComponent
	]
})

export class SubCategoriesModule {}