import React from 'react'
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps
} from 'formik'
import "./../App.scss"

import { passwordClient } from '../accountsgraphqlclient'
import { GraphQLErrorList } from '@accounts/graphql-client'

interface FormValues {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

async function registerUser(values: FormValues) {
  try {
    passwordClient.createUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    })
  } catch (err) {
      /*
          Check if login is valid by looking into db
          Send to homepage if so
          Return message not valid login if not
      */
      if (err instanceof GraphQLErrorList) {
        console.log(err.message)
      }
  }
}

const SignupForm: React.FC<{}> = () => {
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  return (
    <div>
      <h1>Sign Up Below!</h1>
      <Formik
        initialValues = {initialValues}
        //TODO add validation
        onSubmit = {values => {
          alert(JSON.stringify(values, null, 2))
          registerUser(values)
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name:</label>
          <Field
              id="firstName"
              name="firstName"
              // type="firstname"
              // onChange={formik.handleChange}
              // value={formik.values.firstname}
          />
          <label htmlFor="lastName">Last Name:</label>
          <Field
              id="lastname"
              name="lastname"
              // type="lastname"
              // onChange={formik.handleChange}
              // value={formik.values.lastname}
          />
          <label htmlFor="email">Last Name:</label>
          <Field
              id="email"
              name="email"
              // type="lastname"
              // onChange={formik.handleChange}
              // value={formik.values.lastname}
          />
          <label htmlFor="password">Last Name:</label>
          <Field
              id="password"
              name="password"
              // type="lastname"
              // onChange={formik.handleChange}
              // value={formik.values.lastname}
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default SignupForm
