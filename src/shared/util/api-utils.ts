import { ILocalizedName } from 'src/shared/model/model.components';
export const parseList = list => {
  console.log(list);
  const newList: any[] = [];
  for (const key in list) {
    newList.push(list[key]);
  }
  console.log(newList);
  return newList;
};

export const myNameKey = (nameObject: ILocalizedName, lng: string) => {
  const keys = Object.keys(nameObject);
  return keys.find(k => k.includes(lng)) || 'name-USen';
}
