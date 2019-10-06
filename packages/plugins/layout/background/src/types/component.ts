import { LayoutPluginProps } from '@react-page-nm/core/lib/service/plugin/classes';
import { BackgroundState } from './state';
import { BackgroundSettings } from './settings';

export type BackgroundProps = LayoutPluginProps<BackgroundState> & BackgroundSettings;
