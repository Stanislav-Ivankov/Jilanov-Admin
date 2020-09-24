import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class FiltersService {
    
    constructor(
        private apiService: ApiService
    ) { }

    public getFilters(screen) {
        return this.apiService.get('filters?screen=' + screen);
    }
}
