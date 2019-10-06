import React from 'react';

import { lazyLoad } from '@react-page-nm/core';
import createMarkPlugin from '../../pluginFactories/createMarkPlugin';

const UnderlinedIcon = lazyLoad(() =>
  import('@material-ui/icons/FormatUnderlined')
);

export default createMarkPlugin({
  type: 'EMPHASIZE/U',
  tagName: 'u',
  icon: <UnderlinedIcon />,
  hotKey: 'mod+u',
});
