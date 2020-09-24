import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';

import { InforceTableComponent } from './inforce-table/inforce-table.component';
import { InforceColorPickerComponent } from './inforce-color-picker/inforce-color-picker.component';
import { InforceFileListComponent } from './inforce-file-list/inforce-file-list.component';
import { InforceFileUploadComponent } from './inforce-file-upload/inforce-file-upload.component';
import { InforceFilePreviewComponent } from './inforce-file-preview/inforce-file-preview.component';

@NgModule({
	declarations: [
		InforceTableComponent,
		InforceColorPickerComponent,
		InforceFileListComponent,
		InforceFileUploadComponent,
		InforceFilePreviewComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule
	],
	exports: [
		MaterialModule,
		InforceTableComponent,
		InforceColorPickerComponent,
		InforceFileListComponent,
		InforceFileUploadComponent,
		InforceFilePreviewComponent
	]
})

export class SharedModule {}