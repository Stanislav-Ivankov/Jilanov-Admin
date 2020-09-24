import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { ImageEditorComponent } from './image-editor.component';

const Routes_Array: Routes = [
	{ path: '', component: ImageEditorComponent }
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
		ImageEditorComponent
	],
	exports: [
		ImageEditorComponent
	]
})

export class ImageEditorModule {}