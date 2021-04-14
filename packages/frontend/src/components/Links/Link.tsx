/*
 * CS3099 Group A3
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
