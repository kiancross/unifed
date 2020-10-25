import {useFormik} from 'formik'
import React from 'react'
import "./../App.scss"
import { Link } from "react-router-dom"

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