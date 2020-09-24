import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// const baseUrl = 'http://23bad36526fc.ngrok.io/api/';
// const baseUrl = 'http://127.0.0.1:3200/api/';
const baseUrl = 'http://www.jilanov.com:3200/api/';

@Injectable()
export class ApiService {

	constructor(private http: HttpClient) {}

	public getBaseUrl() {
		return baseUrl.split('api')[0];
	}

	public get(url) {
		return this.http.get(baseUrl + url).toPromise();
	}

	public post(url, body) {
		return this.http.post(baseUrl + url, body).toPromise();
	}

	public patch(url, body) {
		return this.http.patch(baseUrl + url, body).toPromise();
	}

	public delete(url, body?) {
		return this.http.delete(baseUrl + url, body).toPromise();
	}
}