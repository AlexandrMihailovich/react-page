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

// import Drawer from '@material-ui/core/Drawer';
import * as React from 'react';

// import ThemeProvider, { darkTheme } from '../ThemeProvider';

const darkBlack = 'rgba(0, 0, 0, 0.87)';
const bright = 'rgba(255,255,255, 0.98)';
const brightBorder = 'rgba(0, 0, 0, 0.12)';
export interface BottomToolbar {
  open?: boolean;
  children?: Object;
  className?: string;
  dark: boolean;
  anchor?: 'top' | 'bottom';
}

const BottomToolbar: React.SFC<BottomToolbar> = ({
  open = false,
  children,
  className,
  dark = false,
  anchor = 'bottom',
}) => (
    // <ThemeProvider theme={dark ? darkTheme : null}>
    <div className={'BottomToolbar ' + className} style={{
      backgroundColor: 'transparent',
      border: 'none',
      overflow: 'visible',
      display: open ? 'block' : 'none'
    }}>
        <div
          style={{
            border: `${dark ? darkBlack : brightBorder} 1px solid`,
            borderRadius: '4px 4px 0 0',
            backgroundColor: dark ? darkBlack : bright,
            padding: '12px 24px',
            margin: 'auto',
            boxShadow: '0px 1px 6px -1px rgba(0,0,0,0.2)',
          }}
        >
          {children}
        </div>
    </div>
    // </ThemeProvider>
  );

export default BottomToolbar;
