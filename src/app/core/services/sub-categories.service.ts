import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class SubCategoriesService {
    
    constructor(
        private apiService: ApiService
    ) { }

    public getAll() {
        return this.apiService.get('sub-categories')
    }

    public getByCategory(categoryId) {
        return this.apiService.get('sub-categories/' + categoryId)
    }


    public async update(product) {
        return await this.apiService.patch(`sub-category/${product._id}`, product);
    }

    public async create(product) {
        return await this.apiService.post('sub-category', product);
    }

    public async delete(id, body?) {
        return await this.apiService.delete(`sub-category/${id}`, body);
    }
}