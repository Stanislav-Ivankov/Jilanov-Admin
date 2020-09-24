import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ImageEditorService {

    categories = [];
    
    constructor(
        private apiService: ApiService
    ) { }

    public setCategories(categories) {
        this.categories = categories;
    }

    public async getCategories() {
        if(this.categories.length) {
            return await this.getAll();
        } else {
            return this.categories;
        }
    }

    public getAll() {
        return this.apiService.get('categories');
    }

    public post(body) {
        return this.apiService.post('categories', body);
    }

    public patch(id, body) {
        return this.apiService.patch('categories/' + id, body);
    }

    public delete(id) {
        return this.apiService.delete('categories/' + id);
    }
}
