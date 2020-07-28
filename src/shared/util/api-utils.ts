export const parseList = list => {
  console.log(list);
  const newList: any[] = [];
  for (const key in list) {
    newList.push(list[key]);
  }
  console.log(newList);
  return newList;
};
