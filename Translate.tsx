
// Fixed: Aliased stringifyNode to normalizeText as components/Translate exports stringifyNode but not normalizeText.
export { default, Translate, useTranslate, stringifyNode as normalizeText } from './components/Translate';