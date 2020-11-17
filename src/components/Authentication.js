import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Authentication.css';
 
class Authentication extends Component {
    render() {

        const loginView = (
            <div class="login-page">
				<div class="form">
					<form class="login-form">
						<input type="text" placeholder="username"/>
						<input type="password" placeholder="password"/>
						<button>LOGIN</button>
						<p class="message">Not registered? <a href="#">Create an account</a></p>
					</form>
				</div>
			</div>
        );
 
        const registerView = (
            <div class="login-page">
				<div class="form">
					<form class="register-form">
						<input type="text" placeholder="name"/>
						<input type="password" placeholder="password"/>
						<input type="text" placeholder="email address"/>
						<button>create</button>
						<p class="message">Already registered? <a href="#">Sign In</a></p>
					</form>
				</div>
			</div>
        );
        return (
            <div className="container auth">
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="auth-title">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView }
                </div>
            </div>
        );
    }
}
 
Authentication.propTypes = {
    mode: PropTypes.bool
};
 
Authentication.defaultProps = {
    mode: true
};
 
export default Authentication;