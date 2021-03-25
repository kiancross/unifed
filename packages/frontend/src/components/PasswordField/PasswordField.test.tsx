/*
 * CS3099 Group A3
 */

import { render } from "@testing-library/react";
import { Formik, Form } from "formik";
import { PasswordField } from "./PasswordField";

test("PasswordField renders", () => {
  render(
    <Formik initialValues={undefined} onSubmit={null}>
      <Form>
        <PasswordField />
      </Form>
    </Formik>,
  );
});
