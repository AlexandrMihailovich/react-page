import { ContentPluginProps } from '@react-page-nm/core/lib/service/plugin/classes';
import { Html5VideoState } from './state';
import { Html5VideoSettings } from './settings';

export type Html5VideoProps = ContentPluginProps<Html5VideoState> & Html5VideoSettings;
