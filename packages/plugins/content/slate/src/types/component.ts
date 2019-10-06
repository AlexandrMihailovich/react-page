import { ContentPluginProps } from '@react-page-nm/core/lib/service/plugin/classes';
import { SlateState } from './state';
import { SlateSettings } from './settings';
import { SerializationFunctions } from '../serialization';

export type SlateProps = ContentPluginProps<SlateState> &
  SlateSettings & {
    serializeFunctions: SerializationFunctions;
  };
