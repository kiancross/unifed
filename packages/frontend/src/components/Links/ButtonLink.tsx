/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Link, LinkProps } from "react-router-dom";
import { Button, ButtonProps } from "@material-ui/core";
import { ReactElement } from "react";

/**
 * Properties for the [[`ButtonLink`]] component.
 *
 * @internal
 */
export type ButtonLinkProps = Omit<ButtonProps, "component"> & LinkProps;

/**
 * Formatted button to direct the user to different pages.
 *
 * Outline:
 *
 *  - User can click the button to be taken to the link given.
 *
 * @param props Properties passed to the component. See [[`ButtonLinkProps`]].
 * @internal
 */
export function ButtonLink(props: ButtonLinkProps): ReactElement {
  return <Button component={Link} {...props} />;
}
