import React from 'react';
import { lazyLoad } from 'react-page-nm-core';
import createSimpleHtmlBlockPlugin from '../pluginFactories/createSimpleHtmlBlockPlugin';

const BlockquoteIcon = lazyLoad(() => import('@material-ui/icons/FormatQuote'));

export default createSimpleHtmlBlockPlugin({
  type: 'BLOCKQUOTE/BLOCKQUOTE',
  icon: <BlockquoteIcon />,
  tagName: 'blockquote',
});
