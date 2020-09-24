import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CaroselService {

    slides = [];
    
    constructor(
        private apiService: ApiService
    ) { }

    public async getSlides() {
        if(!this.slides.length) {
            return await this.apiService.get('carousel');
        } else {
            return this.slides;
        }
    }

    public async updateSlide(slide) {
        return await this.apiService.patch(`carousel/slide/${slide.get('_id')}`, slide);
    }

    public async createSlide(slide) {
        return await this.apiService.post('carousel', slide);
    }

    public async deleteSlide(id, body?) {
        return await this.apiService.delete(`carousel/slide/${id}`, body);
    }
}
