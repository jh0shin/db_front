import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Authentication.css';
 
class Authentication extends Component {
    state = {
        id: "",
        password: "",
        name: "",
        address: "",
        gender: "",
        phone: "",
        birth: "",
        role: ""
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleRegister = () => {
        let id = this.state.id;
        let password = this.state.password;
        let name = this.state.name;
        let address = this.state.address;
        let gender = this.state.gender;
        let phone = this.state.phone;
        let birth = this.state.birth;
        let role = this.state.role;

        this.props.onRegister(id, password, name, address, gender, phone, birth, role).then(
            (result) => {
                if (!result) {
                    this.setState({
                        id: "",
                        password: "",
                        name: "",
                        address: "",
                        gender: "",
                        phone: "",
                        birth: "",
                        role: ""
                    })
                }
            }
        )
    }

    render() {

        const loginView = (
            <div className="login-page">
				<div className="form">
					<form className="login-form">
						<input
                            name="id" type="text" placeholder="ID"
                            onChange={this.handleChange} value={this.state.id}
                        />
						<input
                            name="password" type="password" placeholder="Password"
                            onChange={this.handleChange} value={this.state.password}
                        />
						<button>LOGIN</button>
						<p className="message">Not registered? <a href="/register">Create an account</a></p>
					</form>
				</div>
			</div>
        );
 
        const registerView = (
            <div className="login-page">
				<div className="form">
					<form className="register-form">
                        <input
                            name="id" type="text" placeholder="ID"
                            onChange={this.handleChange} value={this.state.id}
                        />
                        <input
                            name="password" type="password" placeholder="Password"
                            onChange={this.handleChange} value={this.state.password}
                        />
                        <input
                            name="name" type="text" placeholder="Name"
                            onChange={this.handleChange} value={this.state.name}
                        />
                        <input
                            name="address" type="text" placeholder="Address"
                            onChange={this.handleChange} value={this.state.address}
                        />
                        <input
                            name="gender" type="text" placeholder="Gender"
                            onChange={this.handleChange} value={this.state.gender}
                        />
                        <input
                            name="phone" type="text" placeholder="Phone"
                            onChange={this.handleChange} value={this.state.phone}
                        />
                        <input
                            name="birth" type="text" placeholder="Birth"
                            onChange={this.handleChange} value={this.state.birth}
                        />
                        <input
                            name="role" type="text" placeholder="Role"
                            onChange={this.handleChange} value={this.state.role}
                        />
						<button onClick={this.handleRegister}>REGISTER</button>
						<p className="message">Already registered? <a href="/login">Sign In</a></p>
					</form>
				</div>
			</div>
        );

        return (
            <div className="container auth">
                <div>
                    <div>
                        <div className="auth-title">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView }
                </div>
            </div>
        );
    }
}
 
Authentication.propTypes = {
    mode: PropTypes.bool,
    onRegister: PropTypes.func
};
 
Authentication.defaultProps = {
    mode: true,
    onRegister: (id, password) => { console.error("register function not defined"); }
};
 
export default Authentication;