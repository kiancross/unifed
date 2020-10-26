import {useFormik} from 'formik'
import React from 'react'
import "./../App.scss"

const buttonStyle = "Submit-button"

const SignupForm = () => {

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        firstname: '',
        lastname: ''
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
            Sign Up Below!
        </h1>

        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstname">Firstname: </label>
            <input
                id="firstname"
                name="firstname"
                type="firstname"
                onChange={formik.handleChange}
                value={formik.values.firstname}
            />

            <label htmlFor="lastname"> Lastname: </label>
            <input
                id="lastname"
                name="lastname"
                type="lastname"
                onChange={formik.handleChange}
                value={formik.values.lastname}
            />

            <label htmlFor="email"> Email Address: </label>
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
      </div>
    );
};

export default SignupForm