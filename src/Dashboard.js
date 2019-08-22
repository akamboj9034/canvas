import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from './Navbar';
import {Link} from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './index.css';
import {Sidenavbar} from './Sidenavbar';
// import {authUser} from './actions/index';
import {Dashboard_faculty} from './Dashboard_faculty';
import {Dashboard_student} from './Dashboard_student';

export class Dashboard extends Component{

    render(){
           //redirect based on successful login
        //    let redirectVar = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
           if(localStorage.getItem('user_type')=="student"){

            var page_type=<Dashboard_student/>
        }
        if(localStorage.getItem('user_type')=="faculty"){
            var page_type=<Dashboard_faculty/>
        }
        return(
            
        <div>
                {/* {redirectVar} */}
                <Navbar/>

            <div class="side_navigation">

                <div class="row">
                    <div class="col-md-2 col-sm-2">
                       
                    <Sidenavbar/>
                    </div>
                    <div class="col-md-10 col-sm-10">
                    <br/>
                    <br/>
                    {page_type}
                    </div>
                </div>

            </div>
         </div>
        )

}
}
