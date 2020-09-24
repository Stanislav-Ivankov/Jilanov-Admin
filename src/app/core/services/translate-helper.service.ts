import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateUtil } from '../../helpers/translate.util';
import { LANGUAGES_REGEX, DEFAULT_LANG_CODE, Language, LANGUAGES } from '../../models/language';

@Injectable({
  providedIn: 'root',
})
export class TranslateHelperService {
  constructor(private translate: TranslateService) {}

  getLanguageCode(): string {
    const lang = this.savedOrBrowserLanguage();
    return lang.match(LANGUAGES_REGEX) ? lang : DEFAULT_LANG_CODE;
  }

  getLanguage(): Language {
    const code: string = this.getLanguageCode();
    const maybeLanguage = LANGUAGES.find(lang => lang.code === code);
    if (maybeLanguage) {
      return maybeLanguage;
    } else {
      return LANGUAGES.find(lang => lang.code === DEFAULT_LANG_CODE);
    }
  }

  private savedOrBrowserLanguage(): string {
    const prevLang = TranslateUtil.getLanguage();
    if (prevLang) {
      return prevLang;
    } else {
      return this.translate.getBrowserLang();
    }
  }
}
