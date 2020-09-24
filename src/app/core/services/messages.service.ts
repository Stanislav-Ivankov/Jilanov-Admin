import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class MessagesService {
    
    constructor(
        private apiService: ApiService
    ) { }

    public getAll() {
        return this.apiService.get('messages');
    }

    public post(body) {
        return this.apiService.post('message', body);
    }

    public delete(id, body) {
        return this.apiService.delete(`messages/${id}`, body);
    }
}
