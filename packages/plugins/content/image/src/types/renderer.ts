import { ImageProps } from './component';
import { ImageLoaded } from 'react-page-nm-ui/lib/ImageUpload/types';

export interface ImageRendererExtraProps {
  imagePreview?: ImageLoaded;
}

export type ImageRendererProps = ImageProps & ImageRendererExtraProps;
