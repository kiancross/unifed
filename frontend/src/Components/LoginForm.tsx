import {useFormik} from 'formik';
import React from 'react';

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
          Login Below!
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

            <button type="submit">Submit</button>
        </form>
      </div>
    );
};

export default LoginForm