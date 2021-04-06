/*
 * CS3099 Group A3
 */

import { Link, LinkProps } from "react-router-dom";
import { Button, ButtonProps } from "@material-ui/core";
import { ReactElement } from "react";

type Props = Omit<ButtonProps, "component"> & LinkProps;

export function ButtonLink(props: Props): ReactElement {
  return <Button component={Link} {...props} />;
}
