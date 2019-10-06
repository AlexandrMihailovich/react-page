import { RGBColor } from 'react-page-nm-ui/lib/ColorPicker/types';

export type Gradient = {
  opacity: number;
  deg: number;
  colors?: { color: RGBColor }[];
};
