import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inforce-file-preview',
  templateUrl: './inforce-file-preview.component.html',
  styleUrls: ['./inforce-file-preview.component.css']
})
export class InforceFilePreviewComponent {
  @Input() showPopup: boolean = false;
  @Input() fileLink: string;
  @Output() hidePopup = new EventEmitter();

  closePopUp() {
    this.hidePopup.emit();
  }
}