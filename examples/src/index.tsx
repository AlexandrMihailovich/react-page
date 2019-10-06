/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// The editor core
import Editor, { Editable, createEmptyState } from 'react-page-nm-core';
import 'react-page-nm-core/lib/index.css'; // we also want to load the stylesheets

// The default ui components
import EditorUi from 'react-page-nm-ui';
import 'react-page-nm-ui/lib/index.css';

// The rich text area plugin
import slate from 'react-page-nm-plugins-slate';

import 'react-page-nm-plugins-slate/lib/index.css';

// The spacer plugin
import spacer from 'react-page-nm-plugins-spacer';
import 'react-page-nm-plugins-spacer/lib/index.css';

// The image plugin
import { imagePlugin } from 'react-page-nm-plugins-image';
import 'react-page-nm-plugins-image/lib/index.css';

// The video plugin
import video from 'react-page-nm-plugins-video';
import 'react-page-nm-plugins-video/lib/index.css';

// The parallax plugin
import parallax from 'react-page-nm-plugins-parallax-background';
import 'react-page-nm-plugins-parallax-background/lib/index.css';

// The background plugin
import background from 'react-page-nm-plugins-background';
import { ModeEnum } from 'react-page-nm-plugins-background';
import 'react-page-nm-plugins-background/lib/index.css';

// The html5-video plugin
import html5video from 'react-page-nm-plugins-html5-video';
import 'react-page-nm-plugins-html5-video/lib/index.css';

// The native handler plugin
import native from 'react-page-nm-plugins-default-native';

// The divider plugin
import divider from 'react-page-nm-plugins-divider';

// Renders json state to html, can be used on server and client side
import { HTMLRenderer } from 'react-page-nm-renderer';
import customContentPlugin from './customContentPlugin';
import customLayoutPlugin from './customLayoutPlugin';
// The content state
import content from './content';
import './styles.css';
import { ImageUploadType } from 'react-page-nm-ui/lib/ImageUpload/types';
import { Plugins } from 'react-page-nm-core';
import customSlatePlugin from './customSlatePlugin';

const fakeImageUploadService: (url: string) => ImageUploadType = defaultUrl => (
  file,
  reportProgress
) => {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      reportProgress(counter * 10);
      if (counter > 9) {
        clearInterval(interval);
        alert(
          'This is a fake image upload service, please provide actual implementation via plugin properties'
        );
        resolve({ url: defaultUrl });
      }
    }, 500);
  });
};

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.REACT_APP_TRACE_UPDATES
) {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const slatePlugin = slate(def => ({
  ...def,
  plugins: [...def.plugins, customSlatePlugin()],
}));
// Define which plugins we want to use (all of the above)
const plugins: Plugins = {
  content: [
    slatePlugin,
    spacer,
    imagePlugin({ imageUpload: fakeImageUploadService('/images/react.png') }),
    video,
    divider,
    html5video,
    customContentPlugin(),
  ],
  layout: [
    background({
      defaultPlugin: slatePlugin,
      imageUpload: fakeImageUploadService('/images/sea-bg.jpg'),
      enabledModes:
        ModeEnum.COLOR_MODE_FLAG |
        ModeEnum.IMAGE_MODE_FLAG |
        ModeEnum.GRADIENT_MODE_FLAG,
    }),
    parallax({ defaultPlugin: slatePlugin }),
    customLayoutPlugin({ defaultPlugin: slatePlugin }),
  ],

  // If you pass the native key the editor will be able to handle native drag and drop events (such as links, text, etc).
  // The native plugin will then be responsible to properly display the data which was dropped onto the editor.
  native,
};

const editor = new Editor({
  plugins: plugins,
  // pass the content states
  editables: [
    ...content,
    // creates an empty state, basically like the line above
    createEmptyState(),
  ],
});

editor.trigger.mode.edit();

// Render the editables - the areas that are editable
const elements = document.querySelectorAll<HTMLDivElement>('.editable');
elements.forEach(element => {
  ReactDOM.render(
    <Editable
      editor={editor}
      id={element.dataset.id as string}
      /*onChange={(state) => {
        if (element.dataset.id === '1') {
          console.log(state)
        }
      }}*/
    />,
    element
  );
});

// Render the ui controls, you could implement your own here, of course.
ReactDOM.render(
  <EditorUi editor={editor} />,

  document.getElementById('controls')
);

// Render as beautified mark up (html)
ReactDOM.render(
  <HTMLRenderer state={content[0]} plugins={plugins} />,
  document.getElementById('editable-static')
);

editor.trigger.editable.add({ id: '10', cells: [] });
