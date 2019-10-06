import { JsonSchema } from './jsonSchema';

import {
  ContentPluginProps,
  ContentPluginConfig,
  LayoutPluginConfig,
  LayoutPluginProps,
  PluginProps
} from 'react-page-nm-core/lib/service/plugin/classes';

export type ControlsType<T> = React.ComponentType<ControlProps<T>>;

type CommonProps<T extends {}> = {
  schema: Omit<JsonSchema<T>, 'type'>;
};

type CommonContentPluginProps<T> = {
  Renderer: React.ComponentType<ContentPluginProps<T>>;
};
type CommonLayoutPluginProps<T> = {
  Renderer: React.ComponentType<LayoutPluginProps<T>>;
};

export type ControlProps<T> = CommonProps<T> & {
  Renderer: React.ComponentType<PluginProps<T>>;
} & PluginProps<T>;

export type ContentPluginDefinition<T> = CommonProps<T> &
  CommonContentPluginProps<T> &
  ContentPluginConfig<T>;

export type LayoutPluginDefinition<T> = CommonProps<T> &
  CommonLayoutPluginProps<T> &
  LayoutPluginConfig<T>;
