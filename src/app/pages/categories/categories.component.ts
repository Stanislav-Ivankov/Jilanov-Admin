import { Component, ChangeDetectorRef } from '@angular/core';
import { AddEditComponent } from './add-edit/add-edit.component';
import { CategoriesService } from '../../core/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'Category',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})

export class CategoryComponent {

	ngOnInit() {
		this._authService.emitLoggedStatus(true);
	}

	columns = [
		{
			iconColumn: true, 
			elementAttribute: 'positionEditIcon'
		},
		{
		  label: 'Label',
		  elementAttribute: 'label.bg'
		},
		{
		  label: 'Title',
		  elementAttribute: 'title.bg'
		},
		{
		  label: 'Content',
		  elementAttribute: 'content.bg'
		},
		{
		  label: 'Products',
		  elementAttribute: 'products'
		},
		{
		  label: 'Show on nav',
		  elementAttribute: 'showOnNav'
		},
		{
		  label: 'Index',
		  elementAttribute: 'index'
		},
		{
		  iconColumn: true,
		  elementAttribute: 'positionDeleteIcon'
		},
	];

	categories = [];
	loading = true;

	constructor(
		private categoriesService: CategoriesService,
		private changeDetectorRef: ChangeDetectorRef,
		public dialog: MatDialog,
		private _authService: AuthService
	) {
		this.fetchAll();
	}

	fetchAll() {
		this.categoriesService.getAll().then((data: any) => {
			this.categories = data
			this.loading = false;
			this.changeDetectorRef.detectChanges()
		})
	}

	onAddNew() {
		const dialogRef = this.dialog.open(AddEditComponent, {
			width: '800px',
			data: {
				item: {
					label: {
						en: '',
						bg: ''
					},
					title: {
						en: '',
						bg: ''
					},
					content: {
						en: '',
						bg: ''
					}
				}
			}
		});
	  
		dialogRef.afterClosed().subscribe(async (result) => {
			if(!result) {
				return;
			}
			this.loading = true;
			let response = await this.categoriesService.create({
				'route': result.item.route,
				'class': result.item.class,
				'icon': result.item.icon,
				'label': {
					en: result.item.label.en,
					bg: result.item.label.bg,
				},
				'title': {
					en: result.item.title.en,
					bg: result.item.title.bg,
				},
				'content': {
					en: result.item.content.en,
					bg: result.item.content.bg,
				},
				'products': result.item.products,
				'showOnNav': result.item.showOnNav,
				'index': result.item.index
			})
			this.loading = false;
			this.fetchAll();
		});
	}

	onEdit(item) {
		console.log('item: ', item);
		const dialogRef = this.dialog.open(AddEditComponent, {
			width: '800px',
			data: {
				item
			}
		});

		console.log('Data: ', item);
	  
		dialogRef.afterClosed().subscribe(async (result) => {
			if(!result) {
				return;
			}
			this.loading = true;
			let response = await this.categoriesService.update({
				'_id': result.item._id,
				'route': result.item.route,
				'class': result.item.class,
				'icon': result.item.icon,
				'label': {
					en: result.item.label.en,
					bg: result.item.label.bg,
				},
				'title': {
					en: result.item.title.en,
					bg: result.item.title.bg,
				},
				'content': {
					en: result.item.content.en,
					bg: result.item.content.bg,
				},
				'products': result.item.products,
				'showOnNav': result.item.showOnNav,
				'index': result.item.index
			})
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
				this.categoriesService.delete(id, {
					images: item.images
				}).then((response) => {
					swalWithBootstrapButtons.fire(
						'Deleted!',
						'Row is deleted.',
						'success'
					)
					this.fetchAll();
				}).catch((e) => {
					swalWithBootstrapButtons.fire(
						'Not Deleted!',
						'Row was not deleted.',
						'error'
					)
				})
			} else if (
			  /* Read more about handling dismissals below */
			  result.dismiss === Swal.DismissReason.cancel
			) {}
		  })
	}
}