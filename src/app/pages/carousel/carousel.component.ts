import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaroselService } from '../../core/services/carousel.service';

import { AddEditComponent } from './add-edit/add-edit.component';
import { ProductsService } from '../../core/services/products.service';
import Swal from 'sweetalert2'
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {

	ngOnInit() {
		this._authService.emitLoggedStatus(true);
	}

	columns = [
		{
		  iconColumn: true, 
		  elementAttribute: 'positionEditIcon'
		},
		{
		  label: 'Product ID',
		  elementAttribute: 'productId'
		},
		{
		  label: 'Index',
		  elementAttribute: 'index'
		},
		{
		  label: 'Text',
		  elementAttribute: 'text',
		  formatFn: this.formatFnBasic.bind(this)
		},
		{
		  label: 'Text Color',
		  elementAttribute: 'textColor'
		},
		{
		  label: 'Description',
		  elementAttribute: 'description',
		  formatFn: this.formatFnBasic.bind(this)
		},
		{
		  label: 'Description Color',
		  elementAttribute: 'descriptionColor'
		},
		{
		  iconColumn: true,
		  elementAttribute: 'positionDeleteIcon'
		},
	];

	slides = [];
	products = [];
	loading = true;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private productsService: ProductsService, 
		private carouselService: CaroselService, 
		public dialog: MatDialog,
		private _authService: AuthService
	) {
		this.fetchAll();
	}

	fetchAll() {
		this.carouselService.getSlides().then((data: any) => {
			this.slides = data
			this.changeDetectorRef.detectChanges()
			this.loading = false;
		})
		this.productsService.getAll().then((data: any) => {
			this.products = data
		})
	}

	onAddNew() {
		const dialogRef = this.dialog.open(AddEditComponent, {
			width: '500px',
			data: {
				item: {
					text: {},
					description: {},
				},
				products: this.products
			}
		});
	  
		dialogRef.afterClosed().subscribe(async (result) => {
			if(!result) {
				return;
			}
			const formData = new FormData();
			formData.append('web', result.item.web);
			formData.append('mobile', result.item.mobile);
			formData.append('category', this.products.filter((el) => el._id === result.item.productId)[0].category);
			formData.append('productId', result.item.productId);
			formData.append('index', result.item.index);
			formData.append('text[en]', result.item.text.en || '');
			formData.append('text[bg]', result.item.text.bg || '');
			formData.append('textColor', result.item.textColor || '');
			formData.append('description[en]', result.item.description.en || '');
			formData.append('description[bg]', result.item.description.bg || '');
			formData.append('descriptionColor', result.item.descriptionColor || '');
			
			this.loading = true;
			let response = await this.carouselService.createSlide(formData)
			this.loading = false;
			this.fetchAll();
		});
	}

	onEdit(item) {
		const dialogRef = this.dialog.open(AddEditComponent, {
			width: '500px',
			data: {
				item,
				products: this.products
			}
		});
	  
		dialogRef.afterClosed().subscribe(async (result) => {
			if(!result) {
				return;
			}
			const formData = new FormData();
			formData.append('_id', result.item._id);
			formData.append('web', result.item.web || result.item.webImage);
			formData.append('mobile', result.item.mobile || result.item.mobileImage);
			formData.append('webImage', result.item.webImage);
			formData.append('mobileImage', result.item.mobileImage);
			formData.append('category', this.products.filter((el) => el._id === result.item.productId)[0].category);
			formData.append('productId', result.item.productId);
			formData.append('index', result.item.index);
			formData.append('text[en]', result.item.text.en || '');
			formData.append('text[bg]', result.item.text.bg || '');
			formData.append('textColor', result.item.textColor || '');
			formData.append('description[en]', result.item.description.en || '');
			formData.append('description[bg]', result.item.description.bg || '');
			formData.append('descriptionColor', result.item.descriptionColor || '');
			
			this.loading = true;
			let response = await this.carouselService.updateSlide(formData)
			this.loading = false;
			this.fetchAll();
		});
	}

	onDelete(item) {
		var id = item._id;
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
			  confirmButton: 'mat-focus-indicator right mat-button mat-flat-button mat-button-base btn-success',
			  cancelButton: 'mat-focus-indicator right mat-button mat-flat-button mat-button-base btn-danger'
			},
			buttonsStyling: false
		  })
		  
		  swalWithBootstrapButtons.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
		  }).then(async (result) => {
			if (result.value) {
				let response = await this.carouselService.deleteSlide(id, {
					image: item.image
				});
				if(response) {
					swalWithBootstrapButtons.fire(
						'Deleted!',
						'Row is deleted.',
						'success'
					)
					this.fetchAll();
				} else {
					swalWithBootstrapButtons.fire(
						'Not Deleted!',
						'Row was not deleted.',
						'error'
					)
				}
			} else if (
			  /* Read more about handling dismissals below */
			  result.dismiss === Swal.DismissReason.cancel
			) {}
		  })
	}

	formatFnBasic(items) {
		let response = '';
		for(let key in items) {
			response += `${key}: ${items[key]}, `;
		}
		return response;
	}
}