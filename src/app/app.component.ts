import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelperService } from './core/services/translate-helper.service';
import { LANGUAGE_CODES, DEFAULT_LANG_CODE } from './models/language';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'jilanov-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {

	loggedIn;

	logout() {
		this._authService.logout();
	}

	constructor(private _authService: AuthService, private _translate: TranslateService,  private _translateHelper: TranslateHelperService) {
		_translate.addLangs(LANGUAGE_CODES);
		_translate.setDefaultLang(DEFAULT_LANG_CODE);
		this._translate.use(this._translateHelper.getLanguageCode());
		this._authService.loggedStatus.subscribe(status => this.loggedIn = status);
	}
}