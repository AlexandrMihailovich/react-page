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
import { BackgroundSettings } from './types/settings';
import createPlugin from './createPlugin';

import BackgroundHtmlRenderer from './Renderer/BackgroundHtmlRenderer';
import { MakeOptional } from './types/makeOptional';
import { ModeEnum } from './types/ModeEnum';

export { ModeEnum };
import { lazyLoad } from 'react-page-nm-core';

const BackgroundDefaultControls = lazyLoad(() =>
  import('./Controls/BackgroundDefaultControls')
);

export default (
  settings: MakeOptional<BackgroundSettings, 'Renderer' | 'Controls'>
) => {
  const plugin = createPlugin({
    Controls: BackgroundDefaultControls,
    Renderer: BackgroundHtmlRenderer,
    ...settings,
  });
  return plugin;
};
