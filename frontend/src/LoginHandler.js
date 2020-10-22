import React from "react"
import LoginForm from "./Components/LoginForm"
import RegisterForm from "./Components/RegisterForm"

class LoginHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggingIn: false
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
                {this.state.isLoggingIn ? <LoginForm/> : <RegisterForm/>}
                <button style={{padding:"10px", margin:30}} onClick={this.handleClick}>
                    {this.state.isLoggingIn ? "I want to register an account" : "I have an account"}
                </button>
            </div>
        )
    }
}

export default LoginHandler