export const UNITS = {
  STANDARD: 'standard',
  METRIC: 'metric',
  IMPERIAL: 'imperial',
}
export const UNITS_SYMBOLS = {
  standard: 'K',
  metric: 'C',
  imperial: 'F',
}
export const LANGUAGES = {
  af: 'Afrikaans',
  al: 'Albanian',
  ar: 'Arabic',
  az: 'Azerbaijani',
  bg: 'Bulgarian',
  ca: 'Catalan',
  cz: 'Czech',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  en: 'English',
  eu: 'Basque',
  fa: 'Persian (Farsi)',
  fi: 'Finnish',
  fr: 'French',
  gl: 'Galician',
  he: 'Hebrew',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  id: 'Indonesian',
  it: 'Italian',
  ja: 'Japanese',
  kr: 'Korean',
  la: 'Latvian',
  lt: 'Lithuanian',
  mk: 'Macedonian',
  no: 'Norwegian',
  nl: 'Dutch',
  pl: 'Polish',
  pt: 'Portuguese',
  pt_br: 'Português Brasil',
  ro: 'Romanian',
  ru: 'Russian',
  sv: 'Swedish',
  se: 'Swedish',
  sk: 'Slovak',
  sl: 'Slovenian',
  sp: 'Spanish',
  es: 'Spanish',
  sr: 'Serbian',
  th: 'Thai',
  tr: 'Turkish',
  ua: 'Ukrainian',
  uk: 'Ukrainian',
  vi: 'Vietnamese',
  zh_cn: 'Chinese Simplified',
  zh_tw: 'Chinese Traditional',
  zu: 'Zulu',
}
export const LANGUAGE_CODES = Object.fromEntries(
  Object.entries(LANGUAGES).map(([key, value]) => [value, key])
)

export function validate_units(units = '') {
  units = units.toLowerCase()
  if (units.toUpperCase() in UNITS);
  else throw new Error(`Invalid units: ${units}`)
  return units.toLowerCase()
}

export function validate_lang(lang = '') {
  if (lang in LANGUAGE_CODES) lang = LANGUAGE_CODES[lang]
  else if (lang in LANGUAGES);
  else throw new Error(`Invalid language: ${lang}`)
  return lang
}
