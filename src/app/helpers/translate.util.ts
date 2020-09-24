import { DEFAULT_LANG_CODE } from '../models/language';

export class TranslateUtil {
	private static readonly LANG_KEY = 'lang';

	static setLanguage(lang: string): void {
		localStorage.setItem(this.LANG_KEY, lang);
		window.location.reload(false);
	}

	static getLanguage(): string {
		return localStorage.getItem(this.LANG_KEY);
	}

	static getLanguageOrDefault(): string {
		return localStorage.getItem(this.LANG_KEY) || DEFAULT_LANG_CODE;
	}
}