/*
 * CS3099 Group A3
 */

import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { Link as MaterialLink, LinkProps as MaterialLinkProps } from "@material-ui/core";
import { ReactElement } from "react";

type Props = Omit<MaterialLinkProps, "component"> &
  RouterLinkProps &
  Pick<Required<RouterLinkProps>, "children">;

/**
 * Link used to reach other pages in the app.
 * @param props styling and 'to' prop providing the link the button should redirect to.
 * @internal
 */
export function Link(props: Props): ReactElement {
  return <MaterialLink component={RouterLink} {...props} />;
}
