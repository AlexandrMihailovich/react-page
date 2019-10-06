### Customize text editing

By default we provide the following plugins:

- `alignment`: allows to align left, right center and justify,
- `blockquote`: place a blockquote
- `code`: place code
- `emphasize`: place em, strong and ul tags
- `headings`: place headings h1 - h6
- `link`: place links
- `lists`: place ordered and unordered lists
- `paragraph`: default paragraph

[See the full list here](/packages/plugins/content/slate/plugins/defaultPlugins.tsx)

If you only want to include some plugins, you can specify them:

```jsx
import slate, { slatePlugins } from '@react-page-nm/plugins-slate';


const slatePlugin = slate(def => ({
  ...def,
  plugins: [
    slatePlugins.headings.h1(),
    slatePlugins.headings.h2(),
    slatePlugins.headings.h3(),
    slatePlugins.emphasize.em(),
    slatePlugins.emphasize.strong(),
    slatePlugins.paragraph() // make sure to always include that
  ]
})

const plugins: Plugins = {
  content: [
    slatePlugin,
    // ...
  ],
  // ...

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
```

or if you want to add an additional plugin, you can use all default plugins like this:

```jsx
import slate, { slatePlugins } from '@react-page-nm/plugins-slate';


const slatePlugin = slate(def => ({
  ...def,
  plugins: [
   ...def.plugins,
   myAdditionalPlugin
  ]
})
```

You can customize slate plugins by providing a customize function. It will take the plugin's default config and you can return a new config. Most obvious usecase is to change the component that renders the plugin's content:

```jsx
// any custom component
const RedH1 = ({ style, ...props }: Props) => (
  <h1 style={{ ...style, color: 'red' }} {...props} />
);

const slatePlugin = slate(slateDef => ({
  ...slateDef,
  plugins: [
    slatePlugins.headings.h1(h1Def => ({
      ...h1Def, // spread it, so that the new config contains all defaults
      Component: ({data, children}) => (
        <RedH1 style={{textAlign: data.get("align")}}>{children}</RedH1>
      )
    }))

  ]
})
```

If you use typescript (and you should!), you will get nice typechecking in the customize function.

### Create your own slate plugins

If you want to create your own slate plugins, we provide a bunch of factory functions to help you with that:

- `createComponentPlugin`: allows to create a plugin which has a component (most built-in plugins use this factory).
- `createSimpleHtmlBlockPlugin`: a more convenient variant of `createComponentPlugin`. It renders a simple component with a html-tag and has built-in serialization. used by plugins like `headings` or `blockquote`
- `createMarkPlugin`: similar to `createSimpleHtmlBlockPlugin` but renders a "mark" with a hover button on selection
- `createDataPlugin`: this plugin toggles data on the current block or inline element, but does not render a component. E.g. the alignment-plugin uses this factory
  you can import these with:

```jsx
import { pluginFactories } from '@react-page-nm/plugins-slate'
```

### Slate-Plugins with custom data

Some plugins require custom data that the user has to provide. E.g. the `link` plugin needs a `href: string`. Easiest way is to define a jsonSchema for your slate plugin. This will auto-generate a form that can update your plugin.

[look at the `link` plugin as an example how to do that](/packages/plugins/content/slate/plugins/link/index.tsx)

[See also this helper library for more information](/packages/plugins/createPluginMaterialUi/README.md)

For **typescript**-users: As you can see, all factories take a generic type Argument. E.g.

```jsx
type LinkData = {
  href: string;
  openInNewWindow?: boolean;
};


const yourLinkPlugin = createComponentPlugin<LinkData>({
  ...
})
```

this ensures that whenver data is used, the type is correct. Very handy also for consumers of your plugin:

```jsx
const linkWithMyOverrriddenComponent = yourLinkPlugin(def => ({
  ...def,
  Component: ({data, children}) => (
    <SuperFancyLink href={data.get("href") /* neat! autocompletion and type checking here! */}>
      {children}
    </SuperFancyLink>
  )
}))
```

the consumer could even change the add more properties to the data type, altough its up to him/her to adjust the controls and serialization so that the new DataType is satisfied:

```jsx
const linkWithTracking = yourLinkPlugin<{campaignTrackingId: string}>(def => ({
  ...def,
  Component: ({data, children}) => (
    <LinkWithTracking href={data.get("href")} campaignTrackingId={data.get("campaignTrackingId")}>
      {children}
    </LinkWithTracking>
  ),
  schema: {
    // this now needs to be compatible to your new data.
    // its best to spread in the default schema (if `yourLinkPlugin` already defines one)
    // and extend it.
    // typescript will help you with that
    ...def.schema,
    required: [...def.schema.required,"campaignTrackingId"]
    properties: {
      ...def.schema.properties,
      campaignTrackingId: {
        title: "Campaign Tracking ID",
        type: "string"
      }
    }
  },
  Controls: null /* if you use schema, set this null, otherwise typescript will complain

  // deserialize needs to be update, because `campaignTrackingId` is not defined as optional above
  deserialize: {
    // we spread in all defaults, but update getData to also include `campaignTrackingId`
    ...def.deserialize,
    getData: el => ({
      ...def.serialization.getData(el),
      campaignTrackingId: "some-default-id"
    })

  }
}))
```
