import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { SubCategoriesService } from '../../core/services/sub-categories.service';
import { CategoriesService } from '../../core/services/categories.service';
import Swal from 'sweetalert2'
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'SubCategory',
	templateUrl: './sub-categories.component.html',
	styleUrls: ['./sub-categories.component.scss']
})

export class SubCategoriesComponent implements OnInit {

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
		  label: 'Category',
		  elementAttribute: 'category'
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

	subCategories = [];
	categories = [];
	loading = true;

	constructor(
		private categoriesService: CategoriesService,
		private subCategoriesService: SubCategoriesService,
		private changeDetectorRef: ChangeDetectorRef,
		public dialog: MatDialog,
		private _authService:AuthService
	) {
		this.fetchAll();
	}

	fetchAll() {
		this.subCategoriesService.getAll().then((data: any) => {
			this.subCategories = data
			this.loading = false;
			this.changeDetectorRef.detectChanges()
		})
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
					}
				},
				categories: this.categories
			}
		});
	  
		dialogRef.afterClosed().subscribe(async (result) => {
			if(!result) {
				return;
			}
			this.loading = true;
			let response = await this.subCategoriesService.create({
				'category': result.item.category,
				'index': result.item.index,
				'label': {
					en: result.item.label.en,
					bg: result.item.label.bg,
				}
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
				item,
				categories: this.categories
			}
		});

		console.log('Data: ', item);
	  
		dialogRef.afterClosed().subscribe(async (result) => {
			if(!result) {
				return;
			}
			this.loading = true;
			let response = await this.subCategoriesService.update({
				'_id': result.item._id,
				'category': result.item.category,
				'index': result.item.index,
				'label': {
					en: result.item.label.en,
					bg: result.item.label.bg,
				}
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
				this.subCategoriesService.delete(id, {
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