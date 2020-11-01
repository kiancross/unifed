import {useFormik} from 'formik'
import React from 'react'
import "./../App.scss"
import { Link } from "react-router-dom"
import logo from "./../st-andrews-logo.png"
import { useQuery, gql } from "@apollo/client"

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const buttonStyle = "Submit-button"

const LoginForm = () => {

    const formik = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      onSubmit: values => {
        /* Check if login is valid by looking into db
        *  Send to homepage if so
        *  Return message not valid login if not
        */
       alert(JSON.stringify(values, null, 2));
      },
    });

    return (
      <div>
        <img src={logo} width="250" height="300">
          </img>
        <h1>
          Welcome Back!
        </h1>

        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address: </label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />

            <label htmlFor="password"> Password: </label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />

            <button className={buttonStyle} type="submit">Submit</button>
        </form>

        <Link to="/reset-password">
          <button className={buttonStyle}> Reset Password </button>
        </Link>

      </div>
    );
};

export default LoginForm
