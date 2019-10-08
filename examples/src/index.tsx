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
// import EditorUi from 'react-page-nm-ui';
import 'react-page-nm-ui/lib/index.css';
import Provider from 'react-page-nm-ui/lib-es/Provider'
import DisplayModeToggle from 'react-page-nm-ui/lib-es/DisplayModeToggle'
import Trash from 'react-page-nm-ui/lib-es/Trash'
import {ToolbarCreator, Props, defaultTranslations} from 'react-page-nm-ui/lib-es/Toolbar'


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
// import divider from 'react-page-nm-plugins-divider';

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

import Drawer from './Drawer';
// import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
// import TextField from '@material-ui/core/TextField';
import {
  LayoutPlugin,
  ContentPlugin
} from 'react-page-nm-core/lib/service/plugin/classes';
// import { Plugin } from 'react-page-nm-core/lib/service/plugin/classes';
import Item from 'react-page-nm-ui/lib-es/Toolbar/Item/index';

interface RawState {
  isSearching: boolean;
  searchText: string;
}
class Raw extends React.Component<Props, RawState> {
  static defaultProps = {
    translations: defaultTranslations,
  };

  input: any = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      isSearching: false,
      searchText: '',
    };

    // this.onSearch = this.onSearch.bind(this);
    // this.searchFilter = this.searchFilter.bind(this);
  }

  componentDidUpdate() {
    const input = this.input;
    if (input && this.props.isInsertMode && input instanceof HTMLElement) {
      setTimeout(() => {
        const e = input.querySelector('input');
        if (e) {
          e.focus();
        }
      }, 100);
    }
  }

  onRef = (component: any) => {
    this.input = component;
  }

  /*onSearch: React.ChangeEventHandler<HTMLInputElement> = e => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      this.setState({
        isSearching: target.value.length > 0,
        searchText: target.value,
      });
    }
  }

  searchFilter(plugin: any) {
    return (
      plugin &&
      plugin.name &&
      plugin.name.toLowerCase().startsWith(this.state.searchText.toLowerCase())
    );
  }*/

  render() {
    const {
      editor: { plugins },
    } = this.props;
    const content = plugins.plugins.content || []//!.filter(this.searchFilter);
    const layout = plugins.plugins.layout || []//!.filter(this.searchFilter);

    return (
      <Drawer
        variant="persistent"
        className="ory-toolbar-drawer"
        open={this.props.isInsertMode}
        PaperProps={{
          style: {
            width: 320,
          },
        }}
      >
        {/* <List
          subheader={
            <ListSubheader>
              {this.props.translations!.insertPlugin}
            </ListSubheader>
          }
        >
          <ListItem>
            <TextField
              inputRef={this.onRef}
              placeholder={this.props.translations!.searchPlaceholder}
              fullWidth={true}
              onChange={this.onSearch}
            />
          </ListItem>
          {layout.length + content.length === 0 && (
            <ListSubheader>
              {this.props.translations!.noPluginFoundContent}
            </ListSubheader>
          )}
        </List> */}
        {content.length > 0 && (
          <List
            subheader={
              <ListSubheader>
                {this.props.translations!.contentPlugins}
              </ListSubheader>
            }
          >
            {content.map((plugin: ContentPlugin, k: Number) => {
              const initialState = plugin.createInitialState();

              return (
                <Item
                  translations={defaultTranslations}
                  plugin={plugin as any}
                  key={k.toString()}
                  insert={{
                    content: {
                      plugin,
                      state: initialState,
                    },
                  }}
                />
              );
            })}
          </List>
        )}
        {layout.length > 0 && (
          <List
            subheader={
              <ListSubheader>
                {this.props.translations!.layoutPlugins}
              </ListSubheader>
            }
          >
            {layout.map((plugin: LayoutPlugin, k: Number) => {
              const initialState = plugin.createInitialState();
              const children = plugin.createInitialChildren();

              return (
                <Item
                  translations={defaultTranslations}
                  plugin={plugin}
                  key={k.toString()}
                  insert={{
                    ...children,
                    layout: {
                      plugin,
                      state: initialState,
                    },
                  }}
                />
              );
            })}
          </List>
        )}
      </Drawer>
    );
  }
}
const Toolbar = ToolbarCreator(Raw)


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
    // divider,
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
  <Provider editor={editor}>
  <Trash renderFunc={(isOverCurrent: boolean) => <div>remove { isOverCurrent }</div>} />
  <DisplayModeToggle />
  <Toolbar />
</Provider>,

  document.getElementById('controls')
);

// Render as beautified mark up (html)
ReactDOM.render(
  <HTMLRenderer state={content[0]} plugins={plugins} />,
  document.getElementById('editable-static')
);

editor.trigger.editable.add({ id: '10', cells: [] });
