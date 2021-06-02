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

import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { Link as MaterialLink, LinkProps as MaterialLinkProps } from "@material-ui/core";
import { ReactElement } from "react";

/**
 * Properties for the [[`Link`]] component.
 *
 * @internal
 */
export type LinkProps = Omit<MaterialLinkProps, "component"> &
  RouterLinkProps &
  Pick<Required<RouterLinkProps>, "children">;

/**
 * Link used to reach other pages in the application (without reloading the page
 * in the browser).
 *
 * @param props Properties passed to the component. See [[`LinkProps`]].
 *
 * @internal
 */
export function Link(props: LinkProps): ReactElement {
  return <MaterialLink component={RouterLink} {...props} />;
}
