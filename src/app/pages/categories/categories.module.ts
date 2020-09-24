import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { CategoryComponent } from './categories.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const Routes_Array: Routes = [
	{ path: '', component: CategoryComponent }
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
		CategoryComponent
	],
	exports: [
		CategoryComponent
	]
})

export class CategoriesModule {}