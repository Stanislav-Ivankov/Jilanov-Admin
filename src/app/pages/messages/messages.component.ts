import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MessagesService } from '../../core/services/messages.service';
import Swal from 'sweetalert2'
import { AuthService } from '../../core/services/auth.service';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {

	ngOnInit() {
		this._authService.emitLoggedStatus(true);
	}

	columns = [
		{
		  label: 'Name',
		  elementAttribute: 'name'
		},
		{
		  label: 'Email',
		  elementAttribute: 'email'
		},
		{
		  label: 'Phone',
		  elementAttribute: 'phone'
		},
		{
		  label: 'Message',
		  elementAttribute: 'message'
		},
		{
		  iconColumn: true,
		  elementAttribute: 'positionDeleteIcon'
		},
	];

	messages = [];
	loading = true;

	constructor(private _authService: AuthService, private changeDetectorRef: ChangeDetectorRef, private messagesService: MessagesService) {
		this.fetchAll();
	}

	fetchAll() {
		this.messagesService.getAll().then((data: any) => {
			this.messages = data
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
				let response: any = await this.messagesService.delete(id, {
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