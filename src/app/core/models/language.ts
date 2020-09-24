export const DEFAULT_LANG_CODE = 'en';

export const LANGUAGE_CODES = ['en'];

export const LANGUAGES: Language[] = [
	{ code: 'en', label: 'English' }
];

export interface Language {
	code: string;
	label: string;
}

export const LANGUAGES_REGEX = /en/;