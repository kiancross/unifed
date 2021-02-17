/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Link, LinkProps } from "react-router-dom";
import { IconButton, IconButtonProps } from "@material-ui/core";

type Props = Omit<IconButtonProps, "component"> & LinkProps;

const IconButtonLink = (props: Props): ReactElement => {
  return <IconButton component={Link} {...props} />;
};

export default IconButtonLink;
