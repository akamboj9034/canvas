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
import { FaPlusCircle } from 'react-icons/fa';

export class Assignments_faculty extends Component{

    constructor(){
        super();
        this.state = {  
            Assignments : [],
            authFlag:false
        }
        
    }
    



    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/assignments_faculty',{headers: {'Authorization': localStorage.getItem('token')}})
                .then((response) => {
                //update the state with the response data
                this.setState({
                    Assignments : this.state.Assignments.concat(response.data) 
                });
            });
    }
    render(){


               //iterate over courses to create a table row
               let details = this.state.Assignments.map(item => {

                return(
                    <tr>
                        <td>{item.course_id}</td>
                        <td>{item.assignment_name}</td>
                        <td>{item.assignment_duedate}</td>
                        <td>{item.assignment_points}</td>
                        <td><Link to={`/show_assignment_faculty/${item._id}`}> <button class="btn btn-success">View</button></Link></td>
                    
                       
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
            <Navbar/>

        <div class="side_navigation">

            <div class="row">
                <div class="col-md-2 col-sm-2">
                   
                <Sidenavbar/>
                </div>
                <div class="col-md-10 col-sm-10">
                <br/>
                <br/>
                <Link to="/create_assignment" class="right"><button class="btn btn-primary"><FaPlusCircle /> Create Assignment</button></Link>
                <br/>
                <br/>
                <br/>
                <h3>Assignments created by you</h3>
<table class="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Assignment Name</th>
                                    <th>Due date</th>
                                    <th>Points</th>

                                
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                
                </div>
            </div>

        </div>
     </div>

        )

}
}