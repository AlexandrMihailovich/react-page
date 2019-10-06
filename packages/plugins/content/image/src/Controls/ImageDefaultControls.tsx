import * as React from 'react';
import { ImageControlsProps } from '../types/controls';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { BottomToolbar, ImageUpload } from '@react-page-nm/ui';

const ImageDefaultControls: React.SFC<ImageControlsProps> = props => {
  const {
    Renderer,
    handleImageLoaded,
    handleImageUploaded,
    handleChange,
    readOnly,
    focused,
  } = props;
  return (
    <div>
      <Renderer {...props} imagePreview={props.imagePreview} />
      {!readOnly && focused && (
        <BottomToolbar open={props.focused}>
          <div style={{ display: 'flex' }}>
            {props.imageUpload && (
              <React.Fragment>
                <ImageUpload
                  translations={props.translations}
                  imageUpload={props.imageUpload}
                  imageLoaded={handleImageLoaded}
                  imageUploaded={handleImageUploaded}
                />
                <Typography
                  variant="body1"
                  style={{ marginLeft: '20px', marginRight: '20px' }}
                >
                  {props.translations.or}
                </Typography>
              </React.Fragment>
            )}
            <TextField
              placeholder={props.translations.srcPlaceholder}
              label={
                props.imageUpload
                  ? props.translations.haveUrl
                  : props.translations.imageUrl
              }
              name="src"
              // style={{ flex: 1 }}
              value={props.state.src}
              onChange={handleChange}
            />
          </div>
          <TextField
            placeholder={props.translations.hrefPlaceholder}
            label={props.translations.hrefLabel}
            name="href"
            style={{ width: '512px' }}
            value={props.state.href}
            onChange={handleChange}
          />
          <br />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.state.target === '_blank'}
                name="target"
                onChange={handleChange}
              />
            }
            label={props.translations.openNewWindow}
          />
        </BottomToolbar>
      )}
    </div>
  );
};

export default ImageDefaultControls;
