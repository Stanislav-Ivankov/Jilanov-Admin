import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'

import { AddEditComponent } from './add-edit/add-edit.component';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { SubCategoriesService } from '../../core/services/sub-categories.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

	ngOnInit() {
		this._authService.emitLoggedStatus(true);
	}

	columns = [
		{
			iconColumn: true, 
			elementAttribute: 'positionEditIcon'
		},
		{
		  label: 'Images',
		  elementAttribute: 'images'
		},
		{
		  label: 'Category',
		  elementAttribute: 'category'
		},
		{
		  label: 'Promotion',
		  elementAttribute: 'promotion'
		},
		{
		  label: 'Discount',
		  elementAttribute: 'discount'
		},
		{
		  label: 'New Product',
		  elementAttribute: 'newProduct'
		},
		{
		  label: 'Model',
		  elementAttribute: 'model.bg'
		},
		{
		  label: 'Url',
		  elementAttribute: 'url'
		},
		{
		  label: 'Price',
		  elementAttribute: 'price'
		},
		{
		  label: 'Params',
		  elementAttribute: 'params',
		  formatFn: this.formatFnBasic.bind(this)
		},
		{
		  label: 'Specs',
		  elementAttribute: 'specs',
		  formatFn: this.formatFnBasic.bind(this)
		},
		{
		  label: 'Extras',
		  elementAttribute: 'extras',
		  formatFn: this.formatFnExtras.bind(this)
		},
		{
		  iconColumn: true,
		  elementAttribute: 'positionDeleteIcon'
		},
	];

	products = [];
	subCategories = [];
	categories = [];
	loading = true;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private subCategoriesService: SubCategoriesService,
		private productsService: ProductsService, 
		private categoriesService: CategoriesService, 
		public dialog: MatDialog,
		private _authService: AuthService
	) {
		this.fetchAll();
	}

	fetchAll() {
		this.categoriesService.getAll().then((data: any) => {
			this.categories = data
		});
		this.subCategoriesService.getAll().then((data: any) => {
			this.subCategories = data
			this.loading = false;
			this.changeDetectorRef.detectChanges()
		});
		this.productsService.getAll().then((data: any) => {
			this.products = data
			this.changeDetectorRef.detectChanges()
			this.loading = false;
		});
	}

	onAddNew() {
		const dialogRef = this.dialog.open(AddEditComponent, {
			width: '80vw',
			height: '80vh',
			data: {
				item: {
					subTitle: {},
					discount: 0,
					images: [],
					params: {
						en: [],
						bg: []
					},
					hidden: false,
					extras: [],
					description: {},
					model: {},
					specs: {
						en: [],
						bg: []
					}
				},
				subCategories: this.subCategories,
				categories: this.categories
			}
		});
	  
		dialogRef.afterClosed().subscribe(async (result) => {
			if(!result) {
				return;
			}
			const formData = new FormData();
			for(let counter = 0; counter < result.item.images.length; counter++) {
				formData.append(`images[${counter}]`, result.item.images[counter]);
			}
			if(result.item.files) {
				for(let counter = 0; counter < result.item.files.length; counter++) {
					formData.append(`files`, result.item.files[counter]);
				}
			}
			formData.append('category', result.item.category);
			formData.append('subCategory', result.item.subCategory);
			formData.append('promotion', result.item.promotion || 'false');
			formData.append('discount', result.item.discount || 0);
			formData.append('newProduct', result.item.newProduct || 'false');
			formData.append('model[en]', result.item.model.en || '');
			formData.append('model[bg]', result.item.model.bg || '');
			formData.append('description[en]', result.item.description.en || '');
			formData.append('description[bg]', result.item.description.bg || '');
			formData.append('subTitle[en]', result.item.subTitle.en || '');
			formData.append('subTitle[bg]', result.item.subTitle.bg || '');
			formData.append('url', result.item.url);
			formData.append('price', result.item.price);
			formData.append('status', result.item.status);
			formData.append('hidden', result.item.hidden);
			for(let counter = 0; counter < result.item.params.bg.length; counter++) {
				formData.append(`params[bg][${counter}][key]`, result.item.params.bg[counter].key || '');
				formData.append(`params[bg][${counter}][keyInfo]`, result.item.params.bg[counter].keyInfo || '');
				formData.append(`params[bg][${counter}][value]`, result.item.params.bg[counter].value || '');
				formData.append(`params[en][${counter}][key]`, result.item.params.en[counter].key || '');
				formData.append(`params[en][${counter}][keyInfo]`, result.item.params.en[counter].keyInfo || '');
				formData.append(`params[en][${counter}][value]`, result.item.params.en[counter].value || '');
			}
			for(let counter = 0; counter < result.item.specs.bg.length; counter++) {
				formData.append(`specs[bg][${counter}][key]`, result.item.specs.bg[counter].key || '');
				formData.append(`specs[bg][${counter}][value]`, result.item.specs.bg[counter].value || '');
				formData.append(`specs[en][${counter}][key]`, result.item.specs.en[counter].key || '');
				formData.append(`specs[en][${counter}][value]`, result.item.specs.en[counter].value || '');
			}
			for(let counter = 0; counter < result.item.extras.length; counter++) {
				formData.append(`extras[${counter}][key][bg]`, result.item.extras[counter].key.bg || '');
				formData.append(`extras[${counter}][key][en]`, result.item.extras[counter].key.en || '');
				for(let innerCounter = 0; innerCounter < result.item.extras.length; innerCounter++ || '') {
					formData.append(`extras[${counter}][values][${innerCounter}][key][bg]`, result.item.extras[counter].values[innerCounter].key.bg || '');
					formData.append(`extras[${counter}][values][${innerCounter}][key][en]`, result.item.extras[counter].values[innerCounter].key.en || '');
					formData.append(`extras[${counter}][values][${innerCounter}][price]`, result.item.extras[counter].values[innerCounter].price || '');
					formData.append(`extras[${counter}][values][${innerCounter}][default]`, result.item.extras[counter].values[innerCounter].default);

				}
			}
			
			this.loading = true;
			let response = await this.productsService.createProduct(formData)
			this.loading = false;
			this.fetchAll();
		});
	}

	onEdit(item) {
		console.log('item: ', item);
		const dialogRef = this.dialog.open(AddEditComponent, {
			width: '80vw',
			height: '80vh',
			data: {
				item,
				subCategories: this.subCategories,
				categories: this.categories
			}
		});

		console.log('Data: ', item);
	  
		dialogRef.afterClosed().subscribe(async (result) => {
			if(!result) {
				return;
			}
			const formData = new FormData();
			formData.append('_id', result.item._id);
			for(let counter = 0; counter < result.item.images.length; counter++) {
				formData.append(`images[${counter}]`, result.item.images[counter]);
			}
			if(result.item.files) {
				for(let counter = 0; counter < result.item.files.length; counter++) {
					formData.append(`files`, result.item.files[counter]);
				}
			}
			formData.append('category', result.item.category);
			formData.append('subCategory', result.item.subCategory);
			formData.append('promotion', result.item.promotion || 'false');
			formData.append('discount', result.item.discount);
			formData.append('newProduct', result.item.newProduct || 'false');
			formData.append('model[en]', result.item.model.en);
			formData.append('model[bg]', result.item.model.bg);
			formData.append('description[en]', result.item.description.en || '');
			formData.append('description[bg]', result.item.description.bg || '');
			formData.append('subTitle[en]', result.item.subTitle.en);
			formData.append('subTitle[bg]', result.item.subTitle.bg);
			formData.append('url', result.item.url);
			formData.append('price', result.item.price);
			formData.append('status', result.item.status);
			formData.append('hidden', result.item.hidden);
			for(let counter = 0; counter < result.item.params.bg.length; counter++) {
				formData.append(`params[bg][${counter}][key]`, result.item.params.bg[counter].key);
				formData.append(`params[bg][${counter}][keyInfo]`, result.item.params.bg[counter].keyInfo);
				formData.append(`params[bg][${counter}][value]`, result.item.params.bg[counter].value);
				formData.append(`params[en][${counter}][key]`, result.item.params.en[counter].key);
				formData.append(`params[en][${counter}][keyInfo]`, result.item.params.en[counter].keyInfo);
				formData.append(`params[en][${counter}][value]`, result.item.params.en[counter].value);
			}
			for(let counter = 0; counter < result.item.specs.bg.length; counter++) {
				formData.append(`specs[bg][${counter}][key]`, result.item.specs.bg[counter].key);
				formData.append(`specs[bg][${counter}][value]`, result.item.specs.bg[counter].value);
				formData.append(`specs[en][${counter}][key]`, result.item.specs.en[counter].key);
				formData.append(`specs[en][${counter}][value]`, result.item.specs.en[counter].value);
			}
			for(let counter = 0; counter < result.item.extras.length; counter++) {
				formData.append(`extras[${counter}][key][bg]`, result.item.extras[counter].key.bg);
				formData.append(`extras[${counter}][key][en]`, result.item.extras[counter].key.en);
				for(let innerCounter = 0; innerCounter < result.item.extras.length; innerCounter++) {
					formData.append(`extras[${counter}][values][${innerCounter}][key][bg]`, result.item.extras[counter].values[innerCounter].key.bg);
					formData.append(`extras[${counter}][values][${innerCounter}][key][en]`, result.item.extras[counter].values[innerCounter].key.en);
					formData.append(`extras[${counter}][values][${innerCounter}][price]`, result.item.extras[counter].values[innerCounter].price);
					formData.append(`extras[${counter}][values][${innerCounter}][default]`, result.item.extras[counter].values[innerCounter].default);

				}
			}

			this.loading = true;
			let response = await this.productsService.updateProduct(formData)
			this.loading = false;
			// let response = await this.productsService.updateProduct(formData)
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
				let response: any = await this.productsService.deleteProduct(id, {
					images: item.images
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
		for(let counter = 0; counter < items.length; counter++) {
			response += `Key: ${items[counter].bg.key}, Value: ${items[counter].bg.value},`;
		}
		return response;
	}

	formatFnExtras(items) {
		let response = '';
		for(let counter = 0; counter < items.length; counter++) {
			if(!items[counter].key) {
				return;
				debugger;
			}
			response += `Key: ${items[counter].key.bg}, Values: `;
			for(let itemCounter = 0; itemCounter < items[counter].values.length; itemCounter++) {
				response += `Key: ${items[counter].values[itemCounter].key.bg}, Value: ${items[counter].values[itemCounter].price},`;
			}
		}
		return response;
	}
}