import { ILocalizedName } from 'src/shared/model/model.components';

export const getLanguage = () => {
  // @ts-ignore
  const lang: string = (navigator.language || navigator.userLanguage);
  const splitLang = lang.split('-');
  if (splitLang.length > 1) {
    return splitLang[1].toUpperCase();
  } else {
    return lang;
  }
}

export const myNameKey = (nameObject: ILocalizedName) => {
  const lng = getLanguage();
  const keys = Object.keys(nameObject);
  return keys.find(k => k.includes(lng)) || 'name-USen';
}
