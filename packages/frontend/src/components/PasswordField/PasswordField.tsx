/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Lewis Mazzei
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

import { ReactElement, useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  TextFieldProps,
  InputProps,
} from "@material-ui/core";

/**
 * Properties for the [[`PasswordField`]] component.
 *
 * @internal
 */
export type PasswordFieldProps = Omit<TextFieldProps, "type" | "InputProps"> & {
  InputProps?: Omit<InputProps, "endAdornment">;
};

/**
 * Password input component.
 *
 * Outline:
 *
 *  - Users can choose to show or hide their password while they type.
 *
 * @param props Properties passed to the component. See [[`PasswordFieldProps`]].
 *
 * @internal
 */
export function PasswordField(props: PasswordFieldProps): ReactElement {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={isPasswordVisible ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              aria-label="toggle password visibility"
            >
              {isPasswordVisible ? (
                <Tooltip title="Hide Password" aria-label="hide password">
                  <Visibility />
                </Tooltip>
              ) : (
                <Tooltip title="Show Password" aria-label="show password">
                  <VisibilityOff />
                </Tooltip>
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
