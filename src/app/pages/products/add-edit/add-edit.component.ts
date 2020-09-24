import { Component, Inject } from '@angular/core';
import { ApiService } from './../../../core/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.scss']
})

export class AddEditComponent {

	paramsOptions = [
		"CPU",
		"GPU",
		"RAM",
		"Storage",
		"Display",
		"Chipset",
		"Microphone",
		"PositionInside",
		"PositionOutside",
		"Secure",
		"Unsecure",
		"Sensor",
		"Speed",
		"Warranty",
		"Resolution",
		"WaterResistant",
		"Status"
	];

	productStatuses = [
		'A',
		'A-',
		'B',
		'C'
	];

	subCategories;
	
	constructor(
		public dialogRef: MatDialogRef<AddEditComponent>,
		private apiService: ApiService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	get getImageLink() {
		return this.apiService.getBaseUrl() + 'static/'
	}

	setSubCategories(event) {
		this.subCategories = this.data.subCategories.filter((el) => el.category === event.value);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onYesClick() {
		this.dialogRef.close(this.data);
	}

	onFileUpload(event): void {
		if(!this.data.item.files) {
			this.data.item.files = [];
		}
		this.data.item.files.push(event.target.files[0]);
	}

	deleteImage(item) {
		let filter = this.data.item.images.filter((image) => image !== item);
		if(filter.length === this.data.item.images.length) {
			this.data.item.files = this.data.item.files.filter((el) => el.name !== item);
		} else {
			this.data.item.images = filter;
		}
	}

	deleteParam(param) {
		this.data.item.params = {
			bg: this.data.item.params.bg.filter((item) => item.key !== param.key),
			en: this.data.item.params.en.filter((item) => item.key !== param.key)
		}
	}

	addParam() {
		this.data.item.params.en[this.data.item.params.en.length] = {
			key: '',
			value: 'EN'
		}
		this.data.item.params.bg[this.data.item.params.bg.length] = {
			key: '',
			value: 'BG'
		}
	}

	deleteSpec(spec) {
		this.data.item.specs = {
			bg: this.data.item.specs.bg.filter((item) => item.key !== spec.key),
			en: this.data.item.specs.en.filter((item) => item.key !== spec.key)
		}
	}

	addSpec() {
		this.data.item.specs.en[this.data.item.specs.en.length] = {
			key: '',
			value: 'EN'
		}
		this.data.item.specs.bg[this.data.item.specs.bg.length] = {
			key: '',
			value: 'BG'
		}
	}

	deleteExtra(extra) {
		this.data.item.extras = this.data.item.extras.filter((item) => item.key.bg !== extra.key.bg);
	}

	addExtra() {
		this.data.item.extras.push({
			key: {
                en: "Extra",
                bg: "Extra"
            },
            values: [
                {
                    key: {
                        en: "",
                        bg: ""
                    },
                    price: "",
                    default: true
                }
            ]
		})
	}

	addOption(extra) {
		extra.values.push({
			key: {
				en: "",
				bg: ""
			},
			price: "",
			default: false
		})
	}

	removeOption(extra, spec) {
		extra.values = extra.values.filter((val) => val.key.bg !== spec.key.bg)
	}

	get getImages() {
		return this.data.item.images.concat((this.data.item.files || []).map((el) => el.name))
	}
}