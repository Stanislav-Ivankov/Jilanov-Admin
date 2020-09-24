import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class FooterLinksService {

    footerLinks = [];
    
    constructor(
        private apiService: ApiService
    ) { }

    public async getFooterLinks() {
        if(this.footerLinks.length) {
            return await this.getAll();
        } else {
            return this.footerLinks;
        }
    }

    public getAll() {
        return this.apiService.get('footer-links').then((data: any) => {
            this.footerLinks = data;
        });
    }
}
