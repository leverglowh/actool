import { ILocalizedName, IAvailability } from './model.components';

export interface ICritter {
  id: number;
  'file-name'?: string;
  name: ILocalizedName;
  availability: IAvailability;
  isCatchable: [boolean, boolean];
  price?: number;
  'price-cj'?: number;
}
