/*
 * CS3099 Group A3
 */

import { Link, LinkProps } from "react-router-dom";
import { Button, ButtonProps } from "@material-ui/core";
import { ReactElement } from "react";

/**
 * Types for the [[`ButtonLink`]] component.
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
