import { Component, ChangeDetectionStrategy, NgZone, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
// import * as icona from './svg/icon-a.svg'
// import * as iconb from './svg/icon-a.svg'
// import * as iconc from './svg/icon-a.svg'
// import * as icond from './svg/icon-a.svg'

declare var tui: any;

var whiteTheme = {
  'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
  'common.bisize.width': '251px',
  'common.bisize.height': '21px',
  'common.backgroundImage': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAABemlDQ1BJQ0MgUHJvZmlsZQAAKM9jYGAqSSwoyGFhYGDIzSspCnJ3UoiIjFJgv8PAzcDDIMRgxSCemFxc4BgQ4MOAE3y7xsAIoi/rgsxK8/x506a1fP4WNq+ZclYlOgz4AXdKanEyAwMjB5CdnFKcnAtk5wDZOskFRSVA9gwgW7e8pADEPgFkixQBHQhk3wGx0yHsDyB2EpjNxAJWExLkDGRLANkCSRC2BoidDmFbgNjJGYkpQLYHyC6IG8CA08NFwdzAUteRgcogN6cUZgcotHhS80KDQe4AYhkGDwYXBgUGcwYDBksGXQbHktSKEpBC5/yCyqLM9IwSBUdgyKYqOOfnFpSWpBbpKHjmJevpKBgZGBqA1IHiDGL05yCw6Yxi5xFi+QsZGCyVGRiYexBiSdMYGLbvYWCQOIUQU5nHwMBvzcCw7VxBYlEi3OGM31gI8YvTjI0gbB4nBgbWe///f1ZjYGCfxMDwd+L//78X/f//dzHQfmCcHcgBACR3aeD10IV6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABnGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xMTA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+OTk8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KydpWSQAAACVJREFUKFNj/Pnz538GIgFYMRsbG5SLHzBBaaLAqGJkQCvFDAwAlKIH+ycXcc8AAAAASUVORK5CYII=',
  'common.backgroundColor': '#fff',
  'common.border': '1px solid #c1c1c1',

  // header
  'header.backgroundImage': 'none',
  'header.backgroundColor': 'transparent',
  'header.border': '0px',

  // load button
  'loadButton.backgroundColor': '#fff',
  'loadButton.border': '1px solid #ddd',
  'loadButton.color': '#222',
  'loadButton.fontFamily': '\'Noto Sans\', sans-serif',
  'loadButton.fontSize': '12px',

  // download button
  'downloadButton.backgroundColor': '#fdba3b',
  'downloadButton.border': '1px solid #fdba3b',
  'downloadButton.color': '#fff',
  'downloadButton.fontFamily': '\'Noto Sans\', sans-serif',
  'downloadButton.fontSize': '12px',

  // main icons
  'menu.iconSize.width': '24px',
  'menu.iconSize.height': '24px',
//   'menu.normalIcon.path': icond,
//   'menu.activeIcon.path': iconb,
//   'menu.disabledIcon.path': icona,
//   'menu.hoverIcon.path': iconc,

  // submenu primary color
  'submenu.backgroundColor': 'transparent',
  'submenu.partition.color': '#e5e5e5',

  // submenu icons
  'submenu.iconSize.width': '32px',
  'submenu.iconSize.height': '32px',

  // submenu labels
  'submenu.normalLabel.color': '#858585',
  'submenu.normalLabel.fontWeight': 'normal',
  'submenu.activeLabel.color': '#000',
  'submenu.activeLabel.fontWeight': 'normal',

  // checkbox style
  'checkbox.border': '1px solid #ccc',
  'checkbox.backgroundColor': '#fff',

  // rango style
  'range.pointer.color': '#333',
  'range.bar.color': '#ccc',
  'range.subbar.color': '#606060',

  'range.disabledPointer.color': '#d3d3d3',
  'range.disabledBar.color': 'rgba(85,85,85,0.06)',
  'range.disabledSubbar.color': 'rgba(51,51,51,0.2)',

  'range.value.color': '#000',
  'range.value.fontWeight': 'normal',
  'range.value.fontSize': '11px',
  'range.value.border': '0',
  'range.value.backgroundColor': '#f5f5f5',
  'range.title.color': '#000',
  'range.title.fontWeight': 'lighter',

  // colorpicker style
  'colorpicker.button.border': '0px',
  'colorpicker.title.color': '#000'
};

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ImageEditorComponent implements OnInit, OnDestroy {
  public instance: any;
  public changesOverCanvas: boolean = false;
  public loading = true;

  constructor(private _authService: AuthService, private zone: NgZone, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
		this._authService.emitLoggedStatus(true);
	}

  ngAfterViewInit() {
    let self = this;
    console.log('REFRESH VIEW');
    setTimeout(() => {
      this.instance = new tui.ImageEditor(document.querySelector('#tui-image-editor'), {
        includeUI: {
            theme: whiteTheme
        }
      });
      setTimeout(() => {
        document.querySelector('#tui-image-editor').addEventListener('mouseup', () => {
          console.log('Set that there are changes');
          this.changesOverCanvas = true;
        });
        self.changeDetector.markForCheck();
      }, 1000);
      setTimeout(() => {
        // Remove the img
        document.getElementsByClassName('tui-image-editor-header')[0].getElementsByTagName('img')[0].remove();
        // Create the button
      //   this.createSaveButton();
        this.createResetButton();
        self.loading = false;
        self.changeDetector.markForCheck();
      }, 1);
    }, 2000)
  }

  createSaveButton() {
    let btn = document.createElement("button");
    btn.textContent = 'Save';
    btn.className = 'tui-image-editor-download-btn';
    btn.onclick = this.onSave.bind(this);
    document.getElementsByClassName('tui-image-editor-header-buttons')[0].appendChild(btn);
  }

  createResetButton() {
    let btn = document.createElement("button");
    btn.textContent = 'Clear';
    btn.className = 'tui-image-editor-download-btn';
    btn.onclick = this.onReset.bind(this);
    document.getElementsByClassName('tui-image-editor-header-buttons')[0].appendChild(btn);
  }

  onSave() {
    let data64 = this.instance.toDataURL();
    console.log('Save image');
  }

  onReset() {
    // TODO: doesnt want to reupload same image. Probably caching somewhere but didnt had time to research
    // let canvases = document.getElementsByClassName('tui-image-editor-size-wrap')[0].getElementsByTagName('canvas');
    // for(let counter = 0; counter < canvases.length; counter++) {
    //   let context = canvases[counter].getContext('2d');
    //   context.clearRect(0, 0, canvases[counter].width, canvases[counter].height);
    // }
    // (document.getElementsByClassName("tui-image-editor-load-btn")[0] as any).value = "";
    this.loading = true;
    this.changeDetector.markForCheck();
    this.ngAfterViewInit();
  }

  ngOnDestroy() {
    if(this.changesOverCanvas) {
      // TODO: Handle some dialog
    }
  }
}
