import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Field } from "formik";

interface Props {
  errorMessage: string | undefined;
}

const PasswordField = (props: Props): JSX.Element => {
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
              {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
