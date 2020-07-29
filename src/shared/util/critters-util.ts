import { ICritter } from 'src/shared/model/critter.model';
import moment from 'moment';

export const isCatchableNow = (critter: ICritter) => {
  const northOrSouth = JSON.parse(localStorage.getItem('hemi') || '');
  const monthKey = 'month-array-' + northOrSouth;
  const now = moment();
  const isRightMonth = critter.availability.isAllYear || critter.availability[monthKey].includes(now.month());
  const isRightTime = critter.availability.isAllDay || critter.availability['time-array']?.includes(now.hour());
  return isRightMonth && isRightTime;
};
