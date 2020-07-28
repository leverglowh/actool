import { ILocalizedName, IAvailability } from './model.components';

export interface IFish {
  id?: number;
  'file-name'?: string;
  name?: ILocalizedName;
  availability?: IAvailability;
  shadow?: string;
  price?: number;
  'price-cj'?: number;
  'catch-phrase'?: string;
  'museum-phrase'?: string;
  'image_uri'?: string;
  'icon_uri'?: string;
}

export const defaultValue: Readonly<IFish> = {};
