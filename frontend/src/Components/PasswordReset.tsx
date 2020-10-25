import React from "react"
import {useFormik} from 'formik'
import "./../App.scss"
import logo from "./../st-andrews-logo.png"
import { Link } from "react-router-dom"

const buttonStyle = "Submit-button"

const PasswordResetForm = () => {

    const formik = useFormik({
        initialValues: {
          oldpassword: '',
          newpassword: '',
          retypednewpassword: ''
        },
        onSubmit: values => {
            if (values.newpassword != values.retypednewpassword) {
                alert("The enterred passwords do not match\nYour password has not been changed")
            }
            else{
                /* Check if old password is right
                *  Check if new password has been re-typed correctly
                *  Change db password to new password
                */
                alert(JSON.stringify(values, null, 2));
            }
          
        },
    });

    return (
        <div>
            <img src ={logo} width="250" height="300">
                </img>
        <h1>
            Reset Password
        </h1>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="oldpassword">Old Password: </label>
            <input
                id="oldpassword"
                name="oldpassword"
                type="oldpassword"
                onChange={formik.handleChange}
                value={formik.values.oldpassword}
            />
            <label htmlFor="newpassword"> New Password: </label>
            <input
                id="newpassword"
                name="newpassword"
                type="newpassword"
                onChange={formik.handleChange}
                value={formik.values.newpassword}
            />
            <label htmlFor="retypednewpassword"> Retype New Password: </label>
            <input
                id="retypednewpassword"
                name="retypednewpassword"
                type="retypednewpassword"
                onChange={formik.handleChange}
                value={formik.values.retypednewpassword}
            />

            <button className={buttonStyle} type="submit">Submit</button>
        </form>
        <Link to="/login">
        <button className={buttonStyle} type="submit">Login</button>
        </Link>
        </div>
    )
}


export default PasswordResetForm