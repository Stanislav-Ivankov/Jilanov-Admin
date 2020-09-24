import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './login.component';
import { MaterialModule } from '../../material-module';

const Routes_Array: Routes = [
	{ path: '', component: LoginComponent }
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		RouterModule.forChild(Routes_Array)
	],
	declarations: [
		LoginComponent,
	],
	exports: [
		LoginComponent
	]
})

export class LoginModule {}