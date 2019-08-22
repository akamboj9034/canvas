import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import './index.css';
import axios from 'axios';


import { connect } from 'react-redux';
import { authUser } from './actions/index';
import { bindActionCreators } from '../../../Library/Caches/typescript/3.3/node_modules/redux';



class Signup extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      password: "",
      user_type: "",
      authFlag: false,
      error_message: ""
    }
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.usertypeChangeHandler = this.usertypeChangeHandler.bind(this);

    this.submitSignup = this.submitSignup.bind(this);
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


  usertypeChangeHandler = (e) => {
    this.setState({
      user_type: e.target.value
    })
  }

  submitSignup = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      user_type: this.state.user_type,
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/signup', data)
      .then(response => {

        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          // this.props.authUser(response.data);
          const { token } = response.data;

          alert(response.data.token);
          alert(response.data.username);
          alert(response.data.user_type);
          localStorage.setItem("token", token);





          this.setState({
            authFlag: true,
            error_message: "username already taken"
          })
        } else {
          this.setState({
            authFlag: false
          })
        }
      });
  }



  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (this.state.authFlag == true) {
      redirectVar = <Redirect to="/dashboard" />
    }
    return (

      <div>
        {redirectVar}
        <div class="container-fluid">

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

                <h6 class="center">Sign Up</h6>
                <br />
                <div class="form-group">
                  <input onChange={this.usernameChangeHandler} type="text" class="form-control" name="Username" placeholder="Username" />
                </div>

                <div class="form-group">
                  <input onChange={this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                </div>

                <div class="form-group">
                  <label for="gender"><h6>User type: </h6></label>&nbsp;&nbsp;&nbsp;
                              <label class="radio-inline">
                    <input type="radio" name="user_type" onChange={this.usertypeChangeHandler} value="faculty" /> Faculty&nbsp;&nbsp;&nbsp;
                              </label>
                  <label class="radio-inline">
                    <input type="radio" name="user_type" onChange={this.usertypeChangeHandler} value="student" /> Student
                              </label>
                </div>


                <button onClick={this.submitSignup} class="btn btn-primary full">Sign up</button>
                <br />   <br />
                <p class="error_message">{this.state.error_message}</p>


                <br />
                <Link to="/login">Already have an account? Login here</Link>
              </div>


            </div>
            <div class="col-md-4">





            </div>

          </div>









        </div>
      </div>
    );
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


export default connect(mapStateToProps, mapDispatchToProps)(Signup);