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
// import ViewQuilt from '@material-ui/icons/ViewQuilt';
// import Button from '../Button';

import { connect } from 'react-redux';

import { Selectors, Actions } from 'react-page-nm-core';

import { createStructuredSelector } from 'reselect';

export interface InnerReduxProps {
  isLayoutMode: boolean;
}

export interface InnerActionProps {
  layoutMode: React.MouseEventHandler<HTMLElement>;
}
export interface RenderProps {
  description: string;
  active: boolean;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

interface OwnProps {
  label: string;
  children: (props: RenderProps) => React.ReactElement;
}

export type InnerProps = InnerReduxProps & InnerActionProps & OwnProps;

const Inner: React.SFC<InnerProps> = ({ children, label, isLayoutMode, layoutMode }) => children({
  description: label,
  active: isLayoutMode,
  onClick: layoutMode
}); /*(
  <Button
    icon={<ViewQuilt />}
    description={props.label}
    active={props.isLayoutMode}
    onClick={props.layoutMode}
  />
);*/

const mapStateToProps = createStructuredSelector({
  isLayoutMode: Selectors.Display.isLayoutMode,
});
const mapDispatchToProps = { layoutMode: Actions.Display.layoutMode };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inner);
