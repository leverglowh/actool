import { ILocalizedName, IAvailability } from './model.components';
import { ICritter } from './critter.model';

export interface ISeaCreatures extends ICritter {
  id: number;
  'file-name'?: string;
  name: ILocalizedName;
  availability: IAvailability;
  isCatchable: [boolean, boolean];
  speed?: string;
  shadow?: string;
  price?: number;
  'catch-phrase'?: string;
  'museum-phrase'?: string;
  'image_uri'?: string;
  'icon_uri'?: string;
}

export const defaultValue: Readonly<ISeaCreatures> = { id: 0, name: {}, availability: {}, isCatchable: [false, false] };
