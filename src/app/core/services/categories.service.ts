import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CategoriesService {
    
    constructor(
        private apiService: ApiService
    ) { }

    public getAll() {
        return this.apiService.get('categories')
    }

    public async update(product) {
        return await this.apiService.patch(`category/${product._id}`, product);
    }

    public async create(product) {
        return await this.apiService.post('category', product);
    }

    public async delete(id, body?) {
        return await this.apiService.delete(`category/${id}`, body);
    }
}
