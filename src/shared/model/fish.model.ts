import { ILocalizedName, IAvailability } from './model.components';
import { ICritter } from './critter.model';

export interface IFish extends ICritter {
  id: number;
  'file-name'?: string;
  name: ILocalizedName;
  availability: IAvailability;
  isCatchable: [boolean, boolean];
  shadow?: string;
  price?: number;
  'price-cj'?: number;
  'catch-phrase'?: string;
  'museum-phrase'?: string;
  'image_uri'?: string;
  'icon_uri'?: string;
}

export const defaultValue: Readonly<IFish> = { id: 0, name: {}, availability: {}, isCatchable: [false, false] };
