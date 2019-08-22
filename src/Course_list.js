import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './index.css';
import { Sidenavbar } from './Sidenavbar';
import { Course_list_faculty } from './Course_list_faculty';
import { Course_list_student } from './Course_list_student';

import axios from 'axios';


export class Course_list extends Component {

    render() {
        //redirect based on successful login
        //    let redirectVar = null;
        let page_type = "";
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
        if (cookie.load('user_type') == 'student') {
            page_type = <Course_list_student />
        } else {

            page_type = <Course_list_faculty />
        }
        return (

            <div >
                {/* {redirectVar} */}
                <Navbar />

                <div class="side_navigation">

                    <div class="row">
                        <div class="col-md-2 col-sm-2">

                            <Sidenavbar />
                        </div>
                        <div class="col-md-10 col-sm-10">
                            {page_type}
                        </div>
                    </div>

                </div>
            </div>
        )

    }
}