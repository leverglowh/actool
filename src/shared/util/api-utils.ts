import { isCatchableNow } from './critters-util';

export const parseList = list => {
  console.log(list);
  const newList: any[] = [];
  for (const key in list) {
    if (list[key].availability) {
      // is critter!!
      list[key] = { ...list[key], isCatchable: isCatchableNow(list[key])}
    }
    newList.push(list[key]);
  }
  console.log(newList);
  return newList;
};
