
import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inforce-form',
  templateUrl: './inforce-form.component.html',
  styleUrls: ['./inforce-form.component.css']
})
export class InforceFormComponent {
    @Input() columns: Array<Array<Field>> = [];
}

interface Field {
    label: string;
    type: string;
    labelStyles: string;
    multiple: boolean;
}