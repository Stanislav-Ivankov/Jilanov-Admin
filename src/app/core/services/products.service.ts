import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ProductsService {

    products = [];
    
    constructor(
        private apiService: ApiService
    ) { }

    public async getAll() {
        if(!this.products.length) {
            return await this.apiService.get('products');
        } else {
            return this.products;
        }
    }

    public async updateProduct(product) {
        return await this.apiService.patch(`products/product/${product.get('_id')}`, product);
    }

    public async createProduct(product) {
        return await this.apiService.post('products', product);
    }

    public async deleteProduct(id, body?) {
        return await this.apiService.delete(`products/product/${id}`, body);
    }
}
