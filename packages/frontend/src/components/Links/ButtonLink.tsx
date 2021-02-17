/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Link, LinkProps } from "react-router-dom";
import { Button, ButtonProps } from "@material-ui/core";

type Props = Omit<ButtonProps, "component"> & LinkProps;

const ButtonLink = (props: Props): ReactElement => {
  return <Button component={Link} {...props} />;
};

export default ButtonLink;
