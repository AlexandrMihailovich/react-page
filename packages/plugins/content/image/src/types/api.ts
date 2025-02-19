import {
  ImageLoaded,
  ImageUploaded
} from 'react-page-nm-ui/lib/ImageUpload/types';

export interface ImageApi {
  handleImageLoaded: (image: ImageLoaded) => void;
  handleImageUploaded: (image: ImageUploaded) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
