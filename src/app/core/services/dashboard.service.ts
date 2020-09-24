import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class DashboardService {

    dashboardData = [];
    
    constructor(
        private apiService: ApiService
    ) { }

    public setDashboardData(dashboardData) {
        this.dashboardData = dashboardData;
    }

    public async getDashboardData() {
        if(this.dashboardData.length) {
            return await this.getAll();
        } else {
            return this.dashboardData;
        }
    }

    public getAll() {
        return this.apiService.get('dashboard');
    }
}
