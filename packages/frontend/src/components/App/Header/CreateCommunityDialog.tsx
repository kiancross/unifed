/*
 * CS3099 Group A3
 */

import { useState } from "react";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import { gql, useMutation } from "@apollo/client";
import { Add as AddIcon } from "@material-ui/icons";
import { validateName, validateCommunityDescription, validateUsername } from "@unifed/shared";

import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  Button,
  TextField,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";

import { Popup } from "../../";

export const createCommunityQuery = gql`
  mutation($title: String!, $description: String!, $id: String!) {
    createCommunity(title: $title, description: $description, id: $id)
  }
`;

interface FormValues {
  name: string;
  description: string;
  id: string;
}

export function CreateCommunityDialog() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [createCommunity, { loading }] = useMutation(createCommunityQuery, {
    onError: () => setError(true),
  });

  const onOpenClick = () => {
    formik.resetForm();
    setError(false);
    setOpen(true);
  };

  const onCloseClick = () => setOpen(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      id: "",
      name: "",
      description: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: ({ description, id, name }) => {
      const errors: Partial<FormValues> = {};

      if (!validateUsername(id)) {
        errors.id = "Invalid ID";
      }

      if (!validateName(name)) {
        errors.name = "Invalid Name";
      }

      if (!validateCommunityDescription(description)) {
        errors.description = "Invalid Description";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const result = await createCommunity({
        variables: {
          id: values.id,
          title: values.name,
          description: values.description,
        },
      });

      if (result?.data?.createCommunity) {
        onCloseClick();
        history.push(`/instances/this/communities/${values.id}/posts`);
      }
    },
  });

  return (
    <>
      <Tooltip title="Add Community">
        <IconButton onClick={onOpenClick} color="inherit">
          <AddIcon />
        </IconButton>
      </Tooltip>
      <form id="create-community-form" onSubmit={formik.handleSubmit}>
        <Dialog open={open} onClose={onCloseClick} disableBackdropClick>
          <DialogTitle>Create Community</DialogTitle>
          <DialogContent dividers>
            <TextField
              name="id"
              fullWidth
              margin="dense"
              variant="outlined"
              label="Community ID"
              color="primary"
              helperText={formik.errors.id}
              error={!!formik.errors.id}
              onChange={formik.handleChange}
              value={formik.values.id}
              inputProps={{ "data-testid": "id", form: "create-community-form" }}
            />
            <br />
            <TextField
              name="name"
              fullWidth
              margin="dense"
              variant="outlined"
              label="Community Name"
              color="primary"
              helperText={formik.errors.name}
              error={!!formik.errors.name}
              onChange={formik.handleChange}
              value={formik.values.name}
              inputProps={{ "data-testid": "name", form: "create-community-form" }}
            />
            <br />
            <TextField
              name="description"
              fullWidth
              multiline
              margin="dense"
              variant="outlined"
              label="Community Description"
              color="primary"
              helperText={formik.errors.description}
              error={!!formik.errors.description}
              onChange={formik.handleChange}
              value={formik.values.description}
              inputProps={{ "data-testid": "description", form: "create-community-form" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseClick} variant="contained" style={{ margin: "1rem" }} fullWidth>
              Cancel
            </Button>
            <Button
              disabled={!!loading}
              variant="contained"
              color="primary"
              style={{ margin: "1rem 0rem" }}
              fullWidth
              onClick={formik.submitForm}
            >
              {loading ? <CircularProgress color="inherit" size={20} /> : "Create"}
            </Button>
          </DialogActions>
          {error && open ? <Popup message="There was a problem creating this community" /> : null}
        </Dialog>
      </form>
    </>
  );
}
