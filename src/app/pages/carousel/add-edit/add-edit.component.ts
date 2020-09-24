import { Component, Inject } from '@angular/core';
import { ApiService } from './../../../core/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment'

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.scss']
})

export class AddEditComponent {

	path = environment.apiUrl;
	uploaded = false;
	
	constructor(
		private apiService: ApiService,
		public dialogRef: MatDialogRef<AddEditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	get getImageLink() {
		return this.apiService.getBaseUrl() + 'static/'
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onYesClick() {
		this.dialogRef.close(this.data);
	}

	onFileUpload(event, type): void {
		if(!event.target.files[0]) {
			return;
		}
		let reader = new FileReader();
		reader.onload = (e) => {
			this.uploaded = true;
			this.data.item[type + 'Image'] = e.target.result
		}
		this.data.item[type] = event.target.files[0];
		reader.readAsDataURL(event.target.files[0]);
	}

	onWebFileUpload(event) {
		this.onFileUpload(event, 'web')
	}

	onMobileFileUpload(event) {
		this.onFileUpload(event, 'mobile')
	}
}