import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import Swal from 'sweetalert2'
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

	ngOnInit() {
		this._authService.emitLoggedStatus(true);
	}

	columns = [
		{
		  label: 'Total',
		  elementAttribute: 'total'
		},
		{
		  label: 'Name',
		  elementAttribute: 'name'
		},
		{
		  label: 'Phone',
		  elementAttribute: 'phone'
		},
		{
		  label: 'Email',
		  elementAttribute: 'email'
		},
		{
		  label: 'Message',
		  elementAttribute: 'message'
		},
		{
		  label: 'Address',
		  elementAttribute: 'address'
		},
		{
		  label: 'Created at',
		  elementAttribute: 'created_at'
		},
		{
		  iconColumn: true,
		  elementAttribute: 'positionDeleteIcon'
		},
	];
	// items: [{
	// 	id: { type: String, required: true },
	// 	count: String,
	// 	total: Number
	//   }],
	//   extras: [{
	// 	id: String,
	// 	price: String
	//   }],

	orders = [];
	loading = true;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private ordersService: OrdersService,
		private _authService: AuthService
	) {
		this.fetchAll();
	}

	fetchAll() {
		this.ordersService.getAll().then((data: any) => {
			this.orders = data
			this.loading = false;
		})
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
				let response: any = await this.ordersService.delete(id, {
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
}