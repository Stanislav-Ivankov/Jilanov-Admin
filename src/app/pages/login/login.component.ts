import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	ngOnInit() {
		this._authService.emitLoggedStatus(false);
	}

	username = '';
	password = '';

	constructor(private _apiService: ApiService, private _authService: AuthService, private _router: Router) {}

	login() {
		this._apiService.post('admin/login', { username: this.username, password: this.password})
			.then(response => {
				this._authService.setLocalStorage(response);
				this._router.navigate(['/carousel']);
			})
			.catch(err => console.log(err));
	}
}