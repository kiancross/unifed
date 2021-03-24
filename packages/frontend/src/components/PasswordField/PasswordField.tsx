/*
 * CS3099 Group A3
 */
 
import { useState } from "react";
import { IconButton, InputAdornment, TextField, Tooltip } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Field } from "formik";

interface Props {
  errorMessage?: string;
}

export const PasswordField = (props: Props): JSX.Element => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Field
      name="password"
      as={TextField}
      type={isPasswordVisible ? "text" : "password"}
      fullWidth
      size="small"
      margin="dense"
      variant="outlined"
      label="Password"
      color="primary"
      helperText={props.errorMessage}
      error={!!props.errorMessage}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <Tooltip title="hide password">
                  <Visibility />
                </Tooltip>
              ) : (
                <Tooltip title="Show Password">
                  <VisibilityOff />
                </Tooltip>
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
