import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { authUser } from './actions/index';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { bindActionCreators } from '../../../Library/Caches/typescript/3.3/node_modules/redux';
// import { bindActionCreators } from '../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            error_message: ""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login', data)
            .then(response => {
                console.log("Status Code : ", response.status);


                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("user_type", response.data.user_type);
                this.props.authUser(response.data);
                this.setState({
                    authFlag: true,
                    error_message: "the username or password is wrong"
                })

            });
    }

    render() {
        // redirect based on successful login
        let redirectVar = null;
        if (localStorage.getItem('token')) {
            redirectVar = <Redirect to="/dashboard" />
        }
        return (
            <div class="container-fluid">
                {redirectVar}
                <div class="row">
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-4">
                        <br />
                        <br />
                        <br />
                        <div class="login-box">


                            <img class="center" src="http://localhost:3000/images/logo.png" alt="sorry, no display" />
                            <hr />

                            <h6 class="center">Login</h6>
                            <br />
                            <div class="form-group">
                                <input onChange={this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                            </div>
                            <button onClick={this.submitLogin} class="btn btn-primary full">Login</button>
                            <br />
                            <br />
                            <p class="error_message">{this.state.error_message}</p>
                            <br />
                            <Link to="/signup">No account? Signup here</Link>

                        </div>
                    </div>
                    <div class="col-md-4">
                    </div>


                </div>
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    // return bindActionCreators({authUser: authUser}, dispatch);
    return bindActionCreators({ authUser: authUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);