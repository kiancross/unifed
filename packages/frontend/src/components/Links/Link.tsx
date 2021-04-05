/*
 * CS3099 Group A3
 */

import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { Link as MaterialLink, LinkProps as MaterialLinkProps } from "@material-ui/core";

type Props = Omit<MaterialLinkProps, "component"> &
  RouterLinkProps &
  Pick<Required<RouterLinkProps>, "children">;

export function Link(props: Props) {
  return <MaterialLink component={RouterLink} {...props} />;
}
