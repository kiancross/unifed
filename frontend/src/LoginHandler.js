import React from "react"
import LoginForm from "./Components/LoginForm"
import RegisterForm from "./Components/RegisterForm"
import logo from "./st-andrews-logo.png"
import "./App.scss"

/* Will be changed to tsx file once I understand how state works
*/

const buttonStyle = "Submit-button"

class LoginHandler extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggingIn: true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(state => ({
            isLoggingIn: !state.isLoggingIn
        }));
    }

    render() {
        return (
            <div>
                <img src ={logo} width="250" height="300">
                </img> 
                {this.state.isLoggingIn ? <LoginForm/> : <RegisterForm/>}
                <button className={buttonStyle} onClick={this.handleClick}>
                    {this.state.isLoggingIn ? "Sign up" : "Login"}
                </button>
            </div>
        )
    }
}

export default LoginHandler