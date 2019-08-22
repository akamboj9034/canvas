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
import {Show_waitlist} from './Show_waitlist';

export class Course_list_student extends Component{

    constructor(){
        super();
        this.state = {  
            courses : [],
            authFlag:false
        }
    }
    
    componentDidUpdate() {

        if (this.state.authFlag==true) {
       
            axios.get('http://localhost:3001/course_list_student',{headers: {'Authorization': localStorage.getItem('token')}})
        .then((response) => {
        //update the state with the response data
        this.setState({
            courses :response.data ,
            authFlag:false
           
        });
    });

        }

    }

    remove=(e)=>{



        const value = e.target.value;
       
const data={

    course_id:value
}

axios.post('http://localhost:3001/remove_course',data,{headers: {'Authorization': localStorage.getItem('token')}})
.then(response => {
    if(response.status === 200){
        this.setState({
            authFlag : true
        })
    }else{
        this.setState({
            authFlag : false
        })
    }
});

}
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/course_list_student',{headers: {'Authorization': localStorage.getItem('token')}})
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
                        <td>{item}</td>
                        <td><button class="btn btn-danger" onClick={this.remove} value={item}>Remove</button></td>
                        <td><Link to={`/all_enrolled/${item}`}> <button class="btn btn-success">All Enrolled</button></Link></td>
                        <td><Link to={`/announcements_student/${item}`}> <button class="btn btn-success">Announcements</button></Link></td>
                        <td><Link to={`/assignments_student/${item}`}> <button class="btn btn-success">Assignments</button></Link></td>
                        <td><Link to={`/quiz_list/${item}`}> <button class="btn btn-success">Quiz</button></Link></td>
                        <td><Link to={`/grades/${item}`}> <button class="btn btn-success">Grades</button></Link></td>
                        <td><Link to={`/files_student/${item}`}> <button class="btn btn-success">Files</button></Link></td>
                        
                        
                         </tr>
                )
            })
           //redirect based on successful login
        //    let redirectVar = null;
        //    let page_type="";
        //    if(!cookie.load('username')){    
        //        redirectVar = <Redirect to= "/login"/>
        //    }
    
        return(
            
        <div>
                {/* {redirectVar} */}
<h3>Courses enrolled by you</h3>
<table class="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Remove</th>
                                    <th>All enrolled</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>

  <h3>In Waitlist</h3>               
  <Show_waitlist/>       
         </div>
        )

}
}