import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class OrdersService {
    
    constructor(
        private apiService: ApiService
    ) { }

    public getAll() {
        return this.apiService.get('orders');
    }

    public post(body) {
        return this.apiService.post('order', body);
    }

    public delete(id, body) {
        return this.apiService.delete(`orders/${id}`, body);
    }
}
