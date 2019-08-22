import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from './Navbar';
import {Link} from 'react-router-dom';
import { FaUser,FaCalendar,FaTachometerAlt,FaBookReader, FaMailBulk } from 'react-icons/fa';
import './index.css';


export class Sidenavbar extends Component{

    render(){

        return(
            
            <div>

            <div class="side_navigation">

               
                       
                        <div class="sidenav">
                      <Link to="/account">  <a href="#about"><p class="icons"><FaUser /></p><p>Account</p></a></Link>
                      <Link to="/dashboard">  <a href="#about"><p class="icons"><FaTachometerAlt /></p><p>Dashboard</p></a></Link>
                      <Link to="/courses">  <a href="#about"><p class="icons"><FaBookReader /></p><p>Courses</p></a></Link>
                      <Link to="/inbox">  <a href="#about"><p class="icons"><FaMailBulk /></p><p>Inbox</p></a></Link>
                        </div>
                    </div>
       







            </div>



        )

}
}