/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
// import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  validateCommunityName,
  validateCommunityDescription,
  validateCommunityID,
} from "@unifed/shared";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import CenteredLoader from "../CenteredLoader";
import ErrorMessage from "../ErrorMessage";
// import { Alert } from "@material-ui/lab";
// import { Redirect } from "react-router-dom";

interface Values {
  name: string;
  description: string;
  id: string;
}

// async function createCommunity() {}

function validate({ name, description, id }: Values) {
  const errors: Partial<Values> = {};
  if (!validateCommunityID(id)) {
    errors.id = "invalid ID";
  }
  if (!validateCommunityName(name)) {
    errors.name = "Invalid name";
  }
  if (!validateCommunityDescription(description)) {
    errors.description = "Invalid description";
  }
  return errors;
}

interface Values {
  id: string;
  name: string;
  description: string;
}

interface Props {
  onSuccess?: (id: string) => void;
}

export const createCommunityQuery = gql`
  mutation CREATE_COMMUNITY($title: String!, $description: String!, $id: String!) {
    createCommunity(title: $title, description: $description, id: $id)
  }
`;

const CommunityCreationCard = (props: Props): JSX.Element => {
  const [createCommunity, { loading, error, data }] = useMutation(createCommunityQuery);
  const [id, setId] = useState("");

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorMessage message="Could not create community. Please try again later." />;
  if (data && props.onSuccess) props.onSuccess(id);
  // const [isCommunityCreated, setIsCommunityCreated] = useState(false);
  // const [displayCommunityCreationError, setDisplayCommunityCreationError] = useState(false);

  // if (isCommunityCreated) {
  //   return <Redirect to="/" />;
  // }
  return (
    <div>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              id: "",
              name: "",
              description: "",
            }}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values: Values) => {
              createCommunity({
                variables: {
                  id: values.id,
                  title: values.name,
                  description: values.description,
                },
              });
              setId(values.id);
              // createCommunity(values)
              //   .then((res) => {
              //     if (res) setIsCommunityCreated(true);
              //     else setDisplayCommunityCreationError(true);
              //   })
              //   .catch(() => {
              //     setDisplayCommunityCreationError(true);
              //   });
            }}
          >
            {({ errors }) => (
              <Form>
                <div>
                  <Field
                    name="id"
                    as={TextField}
                    fullWidth
                    size="large"
                    margin="dense"
                    variant="outlined"
                    label="ID"
                    color="primary"
                    helperText={errors.description}
                    error={!!errors.description}
                    data-testid="id"
                  />
                </div>
                <div>
                  <Field
                    name="name"
                    as={TextField}
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Name"
                    color="primary"
                    helperText={errors.name}
                    error={!!errors.name}
                    data-testid="name"
                  />
                </div>
                <div>
                  <Field
                    name="description"
                    as={TextField}
                    fullWidth
                    size="large"
                    margin="dense"
                    variant="outlined"
                    label="Description"
                    color="primary"
                    helperText={errors.description}
                    error={!!errors.description}
                    data-testid="description"
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem 0rem" }}
                  fullWidth
                  data-testid="submit"
                >
                  Create Community
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        {/* <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={displayCommunityCreationError}
        >
          <Alert severity="error">Community could not be created</Alert>
        </Snackbar> */}
      </Card>
    </div>
  );
};

export default CommunityCreationCard;
