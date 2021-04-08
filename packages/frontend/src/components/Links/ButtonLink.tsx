/*
 * CS3099 Group A3
 */

import { Link, LinkProps } from "react-router-dom";
import { Button, ButtonProps } from "@material-ui/core";
import { ReactElement } from "react";

type Props = Omit<ButtonProps, "component"> & LinkProps;

/**
 * Formatted button to direct the user to different pages.
 *
 * Outline:
 *
 *  - User can click the button to be taken to the link given.
 *
 * @param props styling for the button and a 'to' prop providing the link the button should redirect to.
 * @internal
 */
export function ButtonLink(props: Props): ReactElement {
  return <Button component={Link} {...props} />;
}
