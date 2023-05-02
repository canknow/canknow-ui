import container from '../container';

export default function (lang) {
  container.langs[lang.core.locale] = lang;
}