import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from './Navbar';
import {Link} from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './index.css';
import {Sidenavbar} from './Sidenavbar';
import axios from 'axios';


export class Course_list_faculty extends Component{

    constructor(){
        super();
        this.state = {  
            courses : []
        }
    }  


    
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/course_list_faculty',{headers: {'Authorization': localStorage.getItem('token')}})
                .then((response) => {
                //update the state with the response data
                this.setState({
                    courses : this.state.courses.concat(response.data) 
                });
            });
    }
    render(){


               //iterate over courses to create a table row
               let details = this.state.courses.map(item => {
                return(
                    <tr>
                        <td>{item.course_id}</td>
                        <td>{item.course_name}</td>
                        <td>{item.course_description}</td>
                        <td>{item.course_dept}</td>
                        <td>{item.course_room}</td>
                        <td>{item.course_capacity}</td>
                        <td>{item.waitlist_capacity}</td>
                        <td>{item.course_term}</td>
                        <td><Link to={`/enrolled/${item.course_id}`}> <button class="btn btn-success">Enrolled</button></Link></td>
                        <td><Link to={`/in_waitlist/${item.course_id}`}> <button class="btn btn-warning">waitlist</button></Link></td>
                        <td><Link to={`/make_announcement/${item.course_id}`}> <button class="btn btn-primary">Announcements</button></Link></td>
                    </tr>
                )
            })
           //redirect based on successful login
        //    let redirectVar = null;
           let no_access = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
           if(cookie.load('user_type')=="student"){
            no_access=<Redirect to= "/dashboard"/>
        }
    
        return(
            
        <div>
                {/* {redirectVar} */}
                {no_access}
<h3>Courses created by you</h3>
<table class="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Department</th>
                                    <th>Room</th>
                                    <th>Capacity</th>
                                    <th>Waitlist capacity</th>
                                    <th>course term</th>
                                    <th>Enrolled</th>
                                    <th>In Waitlist</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
         </div>
        )

}
}