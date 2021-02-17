/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { Link as MaterialLink, LinkProps as MaterialLinkProps } from "@material-ui/core";

type Props = Omit<MaterialLinkProps, "component"> &
  RouterLinkProps &
  Pick<Required<RouterLinkProps>, "children">;

const Link = (props: Props): ReactElement => {
  return <MaterialLink component={RouterLink} {...props} />;
};

export default Link;
