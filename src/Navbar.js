import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
//create the Navbar Component
export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove('username', { path: '/' });
    localStorage.clear();
  }
  render() {


    return (
      <div>




        <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">CANVAS</a>
            </li>


            <li class="nav-item" ><Link to="/" class="nav-link" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
          </ul>

        </nav>




      </div>
    )
  }
}

export default Navbar;