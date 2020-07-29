import { ILocalizedName } from 'src/shared/model/model.components';

export const getLanguage = () => {
  // @ts-ignore
  const lang: string = (navigator.language || navigator.userLanguage);
  const splitLang = lang.split('-');
  let usefulLangString = '';
  if (splitLang.length > 1) {
    usefulLangString = splitLang[1].toUpperCase();
  } else {
    usefulLangString = lang;
  }
  localStorage.setItem('language', JSON.stringify(usefulLangString));
}

export const myNameKey = (nameObject: ILocalizedName) => {
  const lng = JSON.parse(localStorage.getItem('language') || 'US');
  const keys = Object.keys(nameObject);
  return keys.find(k => k.includes(lng)) || 'name-USen';
}
