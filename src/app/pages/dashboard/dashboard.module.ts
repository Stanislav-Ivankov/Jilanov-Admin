import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';



import { DashboardComponent } from './dashboard.component';

const Routes_Array: Routes = [
	{ path: '', component: DashboardComponent }
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
		DashboardComponent
	],
	exports: [
		DashboardComponent
	]
})

export class DashboardModule {}