import { pluginFactories } from 'react-page-nm-plugins-slate';
import React from 'react';

export default pluginFactories.createComponentPlugin<{
  color: string;
}>({
  addHoverButton: true,
  addToolbarButton: true,
  type: 'SetColor',
  object: 'mark',
  icon: <span>Color</span>,
  Component: props => {
    return (
      <span style={{ color: props.data.get('color') }}>{props.children}</span>
    );
  },

  schema: {
    type: 'object',
    required: ['color'],
    properties: {
      color: {
        default: 'blue',
        type: 'string',
        enum: ['red', 'blue', 'green', 'orange'],
      },
    },
  },
});
