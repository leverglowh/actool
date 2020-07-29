import { ICritter } from 'src/shared/model/critter.model';
import moment from 'moment';

/**
 * Checks if a critter can be catched right now.
 * @param critter The critter to be checked
 * @returns a bool list [isRightMonth, isRightTime].
 */
export const isCatchableNow = (critter: ICritter) => {
  const northOrSouth = JSON.parse(localStorage.getItem('hemi') || '');
  const monthKey = 'month-array-' + northOrSouth;
  const now = moment();
  const isRightMonth = critter.availability.isAllYear || critter.availability[monthKey].includes(now.month());
  const isRightTime = critter.availability.isAllDay || critter.availability['time-array']?.includes(now.hour());
  return [isRightMonth, isRightTime];
};

export const sortByAvailability = (critter1: ICritter, critter2: ICritter) => {
  const isMonth1 = critter1.isCatchable[0];
  const isMonth2 = critter2.isCatchable[0];
  const isTime1 = critter1.isCatchable[1];
  const isTime2 = critter2.isCatchable[1];

  // Now it occured to me that I could compare the values instead of listing all the possibilities.
  // Amen

  if (!isMonth1 && !isMonth2) return 0;
  if (isMonth1 && !isMonth2) return -1;
  if (!isMonth1 && isMonth2) return 1;
  // Now month1 and month2 are both true
  if (isTime1 && isTime2) return 0;
  if (isTime1 && !isTime2) return -1;
  if (isTime2 && !isTime1) return 1;

  return 0;
};
