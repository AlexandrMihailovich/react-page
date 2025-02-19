# Tutorials

## ReactJS Example

In this section, we will create a minimalistic react app that uses the React Page.
Before we skip ahead, make sure that [node.js](https://nodejs.org/en/) is installed on your system.

At the moment, the React Page is available only through npm and works best in a ReactJS environment.

### [ReactJS](https://facebook.github.io/react/)

Our goal is to create a ReactJS app that uses the editor.
To scaffold the react app for the purpose of this tutorial, we use [create-react-app](https://github.com/facebookincubator/create-react-app)

```
$ npm i -g create-react-app
$ create-react-app .
```

and install the editor using npm:

```
$ npm i --save ory-editor
```

Next, open the file _src/components/App.js_ and include the React Page:

```jsx
import React, { Component } from "react";

// The editor core
import Editor, { Editable, createEmptyState } from "react-page-nm-core";
import "react-page-nm-core/lib/index.css"; // we also want to load the stylesheets

// Require our ui components (optional). You can implement and use your own ui too!
import EditorUI from "react-page-nm-ui";
import "react-page-nm-ui/lib/index.css";

// Load some exemplary plugins:
import slate from "react-page-nm-plugins-slate"; // The rich text area plugin
import "react-page-nm-plugins-slate/lib/index.css"; // Stylesheets for the rich text area plugin
import parallax from "react-page-nm-plugins-parallax-background"; // A plugin for parallax background images
import "react-page-nm-plugins-parallax-background/lib/index.css"; // Stylesheets for parallax background images

// Define which plugins we want to use. We only have slate and parallax available, so load those.
const plugins = {
  content: [slate()], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
  layout: [parallax({ defaultPlugin: slate() })] // Define plugins for layout cells
};

// Creates an empty editable
const content = createEmptyState();

// Instantiate the editor
const editor = new Editor({
  plugins,
  // pass the content state - you can add multiple editables here
  editables: [content]
});

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        {/* Content area */}
        <Editable editor={editor} id={content.id} />

        {/*  Default user interface  */}
        <EditorUI editor={editor} />
      </div>
    );
  }
}

export default App;
```

That's it, congratulations! You should see something like this now:

![Example app](/docs/images/react-example-app.png)

## Rendering HTML

The `ory-editor-renderer` package ships a lightweight HTML renderer module. You can use it for server-side rendering
and rendering the content client side.

```jsx
import { HTMLRenderer } from "react-page-nm-renderer";

const state = {
  /* ... */
};
const plugins = {
  layout: [
    /* ... */
  ],
  content: [
    /* ... */
  ]
};

const element = document.getElementById("editable");
ReactDOM.render(<HTMLRenderer state={content[0]} plugins={plugins} />, element);
```

## Saving and restoring editor contents

Use the `onChange` callback to obtain a copy of the editor's state for saving to persistent storage. The state can then be later loaded into the editor, or used by the `ory-editor-renderer` package for rendering to HTML.

```jsx
import React, { Component } from "react";
import Editor, { Editable, createEmptyState } from "react-page-nm-core";
import slate from "react-page-nm-plugins-slate"; // The rich text area plugin
import EditorUI from "react-page-nm-ui";
const EditorPlugins = {
  content: [slate()],
  layout: [
    /* ... */
  ]
};

function saveToDatabase(state) {
  return fetch("/my/save/url", { method: "POST", body: state });
}

class MyEditor extends Component {
  componentWillMount() {
    this.editorState = this.props.content || createEmptyState();
    this.editor = new Editor({ EditorPlugins, editables: [content] });
  }
  render() {
    return (
      <div className="my-editor">
        <toolbar>
          <button onClick={() => saveToDatabase(this.editorState)}>Save</button>
        </toolbar>
        <Editable
          editor={editor}
          id={content.id}
          onChange={state => (this.editorState = state)}
        />
        <EditorUI editor={editor} />
      </div>
    );
  }
}
```

The state could then be fetched and rendered by doing something like:

```jsx
import React, {Component} from 'react'

import { HTMLRenderer } from 'react-page-nm-renderer'
import { createEmptyState } from 'react-page-nm-core'

class MyEditorRenderer extends Component {

  componentWillMount() {
    this.plugins = {
    this.setState({ contents: createEmptyState() });
    fetch('/my/save/url').then((savedState) => {
      this.setState({ contents: savedState });
    })
  }

  render() {
    return (
      <div className="my-editor">
        <HTMLRenderer state={this.state.contents} plugins={EditorPlugins} />
      </div>
    )
  }
}

const element = document.getElementById('editable')
ReactDOM.render((
  <MyEditorRenderer />
), element)
```

## Handling native drag events

The React Page is capable of handling native drag and drop events. Native events include dragging of links, text,
and images. Native drag support can be enabled by writing a `NativePlugin` and passing it during instantiation.
In this example, we will use the default plugin, and take a look at how you can create your own later.

```jsx
import native from "react-page-nm-plugins-default-native";

const editor = new Editor({
  plugins: {
    layout: [],
    content: [],
    native
  }
});
```

If native is undefined or null, native dragging wil be disabled. This is the default setting.

Writing a native plugin is like writing a content or layout plugin. The only difference is that our native plugin must
be wrapped in a factory that receives three arguments - `hover`, `monitor`, and `component`. Hover is the cell or row
that is currently being hovered. Monitor is the [DropTargetMonitor](https://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html)
coming from react-dnd and `component` is the React component of the cell or row that is currently being hovered.

In sum, an exemplary plugin looks like this:

```jsx
import React from "react";

const Native = () => <div>native</div>;

export default (hover, monitor, component) => ({
  Component: Native,
  name: "my-native-plugin",
  version: "0.0.1"
});
```

Because this plugin is wrapped in a factory, we are able to modify its behaviour based on the properties we receive.
One such example would be to add the item's data to the initial state for later use.

```jsx
export default (hover, monitor, component) => ({
  // ...
  createInitialState: () => ({
    item: monitor.getItem()
  })
});
```

Per default, the editor assumes that dropping the native element creates a content cell. To change this behaviour, use
the key `type`:

```jsx
export default (hover, monitor, component) => ({
  // ...
  type: "layout"
});
```
