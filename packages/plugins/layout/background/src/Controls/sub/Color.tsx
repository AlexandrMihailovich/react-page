import React, { Component } from 'react';
import { ColorPicker } from 'react-page-nm-ui';
import { RGBColor } from 'react-page-nm-ui/lib/ColorPicker/types';
import { BackgroundProps } from '../../types/component';

export interface ColorComponentProps {
  onChangeBackgroundColorPreview: (color?: RGBColor) => void;
  backgroundColorPreview: RGBColor;
  ensureModeOn: () => void;
}

class ColorComponent extends Component<BackgroundProps & ColorComponentProps> {
  handleChangePickerBackgroundColor = (e: RGBColor) =>
    this.props.onChangeBackgroundColorPreview &&
    this.props.onChangeBackgroundColorPreview(e)

  handleChangePickerBackgroundColorComplete = (e: RGBColor) => {
    if (this.props.onChangeBackgroundColorPreview) {
      this.props.onChangeBackgroundColorPreview(undefined);
    }
    this.props.onChange({ backgroundColor: e });
  }

  render() {
    const {
      backgroundColorPreview,
      state: { backgroundColor = this.props.defaultBackgroundColor },
    } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <ColorPicker
          color={
            backgroundColorPreview ? backgroundColorPreview : backgroundColor
          }
          onChange={this.handleChangePickerBackgroundColor}
          onDialogOpen={this.props.ensureModeOn}
          onChangeComplete={this.handleChangePickerBackgroundColorComplete}
          style={{ margin: 'auto' }}
        />
      </div>
    );
  }
}

export default ColorComponent;
