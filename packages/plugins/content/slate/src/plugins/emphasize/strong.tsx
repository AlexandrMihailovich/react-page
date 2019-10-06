import React from 'react';

import { lazyLoad } from 'react-page-nm-core';
import createMarkPlugin from '../../pluginFactories/createMarkPlugin';

const BoldIcon = lazyLoad(() => import('@material-ui/icons/FormatBold'));

export default createMarkPlugin({
  type: 'EMPHASIZE/STRONG',
  tagName: 'strong',
  icon: <BoldIcon />,
  hotKey: 'mod+b',
});
