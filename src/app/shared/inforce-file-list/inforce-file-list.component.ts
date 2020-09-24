import { Component, Input } from '@angular/core';
import FileInfo from 'src/app/models/file-info';

@Component({
  selector: 'app-inforce-file-list',
  templateUrl: './inforce-file-list.component.html',
  styleUrls: ['./inforce-file-list.component.css']
})
export class InforceFileListComponent {
  @Input() filesList: FileInfo[] = [];
  @Input() visible = false;
  @Input() visibleView = false;
  @Input() view = (file: FileInfo) => console.log('Not implemented view handle');
  @Input() visibleDownload = false;
  @Input() download = (file: FileInfo) => this.downloadFileUsingLink(file.link);
  @Input() visibleLink = false;
  @Input() link = (link: string) => console.log('Not implemented link handle');
  @Input() visibleDelete = true;
  @Input() delete = (file: FileInfo) => console.log('Not implemented delete handle');
  @Input() isDeletable = (file: FileInfo): boolean => false;

  constructor() {
  }

  downloadAll(): void {
    // let links: HTMLAnchorElement[];

    // for (let file of this.filesList) {
    //   debugger;
    //   let anchor = this.createAnchor(file.link);
    //   document.body.appendChild(anchor);
    //   // This one blocks the browser 
    //   anchor.click();
    //   links.push(anchor);
    // }

    // for (let anchor of links) {
    //    document.body.removeChild(anchor);
    // }

    let elements = document.getElementsByClassName('download-link');
    for (let index = 0; index < elements.length; index++) {
      let element = elements[index] as HTMLAnchorElement;
      // Also blocks the code execution
      element.click();
    }
  }

  downloadFileUsingLink(fileLink: string): void {
    let link = this.createAnchor(fileLink);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private createAnchor(fileLink: string): HTMLAnchorElement {
    let link = document.createElement("a");
    link.setAttribute("href", fileLink);
    link.style.display = "none";
    return link;
  }
}