import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inforce-file-upload',
  templateUrl: './inforce-file-upload.component.html',
  styleUrls: ['./inforce-file-upload.component.css']
})
export class InforceFileUploadComponent {
  @Input() onFileUpload = (el) => console.log('Open handler not implemented');

  visibleDropBox = false;
  
  ngAfterViewInit() {
    document.getElementById('file-container').addEventListener("dragenter", () => {
      console.log('dragenter');
      this.visibleDropBox = true;
    });
    document.getElementById('file-container').addEventListener("dragleave", (evt) => {
      console.log('dragleave');
      if(!(event.target as any).contains(evt.relatedTarget)) {
        this.visibleDropBox = false;
      }
    });
  }

  onFileSelected(event) {
    this.visibleDropBox = false;
    this.onFileUpload(event);
  }
}