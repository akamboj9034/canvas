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

export class Create_course extends Component{

    constructor()
    {
    
    super();
    this.state={
        course_id : "",
        course_name: "",
        course_dept: "",
        course_description: "",
        course_room: "",
        course_capacity: "",
        waitlist_capacity: "",
        course_term:"",
        authFlag: false
    }
    }
    







    course_idChangeHandler = (e) => {
        this.setState({
            course_id : e.target.value
        })
    }

    course_nameChangeHandler = (e) => {
        this.setState({
            course_name : e.target.value
        })
    }


    course_deptChangeHandler = (e) => {
        this.setState({
            course_dept : e.target.value
        })
    }
    course_descriptionChangeHandler = (e) => {
        this.setState({
            course_description : e.target.value
        })
    }
    course_roomChangeHandler = (e) => {
        this.setState({
            course_room : e.target.value
        })
    }
    course_capacityChangeHandler = (e) => {
        this.setState({
            course_capacity : e.target.value
        })
    }
    waitlist_capacityChangeHandler = (e) => {
        this.setState({
            waitlist_capacity : e.target.value
        })
    }

    course_termChangeHandler = (e) => {
        this.setState({
            course_term : e.target.value
        })
    }



    submitCourse = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            course_id : this.state.course_id,
            course_name : this.state.course_name,
            course_dept : this.state.course_dept,
            course_description: this.state.course_description,
            course_room: this.state.course_room,
            course_capacity: this.state.course_capacity,
            waitlist_capacity: this.state.waitlist_capacity,
            course_term: this.state.course_term
            

        }
        alert(JSON.stringify(data));
        //set the with credentials to true
        axios.defaults.withCredentials = true;
  
        //make a post request with the user data
        axios.post('http://localhost:3001/create_course',data,{headers: {'Authorization': localStorage.getItem('token')}})
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                    
                    alert(response.data);
                }else{
                    this.setState({
                        authFlag : false
                    })
                    alert("there is some error");
                }
            });
      }
      



    render(){
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
                    <h3 class="center">Create a Course</h3><br/><br/>
                    <form action="http://localhost:3001/create_course" method="post" >
                    <div class="row">
                <div class="col-md-6 col-sm-6">
                        <div class="form-group ">
                        <label for="course_id">Course Id:</label>
                                        <input  type="number" class="form-control" onChange = {this.course_idChangeHandler}  name="course_id" required/>
                        </div>

                        <div class="form-group">
                        <label for="course_name">Course name:</label>
                                        <input  type="text" class="form-control" onChange = {this.course_nameChangeHandler}  name="course_name"  required/>
                        </div>
                        <div class="form-group">
                        <label for="course_dept">Course Dept:</label>
                                        <input  type="text" class="form-control"  onChange = {this.course_deptChangeHandler} name="course_dept" required />
                        </div>
                        <div class="form-group">
                        <label for="course_description">Course Description:</label>
                                        <input  type="text" class="form-control" onChange = {this.course_descriptionChangeHandler}  name="course_description"  required/>
                        </div>

                        <div class="form-group">
                        <label for="course_room">Course Room:</label>
                                        <input  type="text" class="form-control"  onChange = {this.course_roomChangeHandler} name="course_room" required />
                        </div>

                </div>
                <div class="col-md-6 col-sm-6">

          
                        <div class="form-group">
                        <label for="course_capacity">Course Capacity:</label>
                                        <input  type="number" class="form-control"  onChange = {this.course_capacityChangeHandler} name="course_capacity"  required/>
                        </div>
                 


                         <div class="form-group">
                        <label for="waitlist_capacity">Waitlist Capacity:</label>
                                        <input  type="number" class="form-control"  onChange = {this.waitlist_capacityChangeHandler} name="waitlist_capacity"  required/>
                        </div>
                        <div class="form-group">
                        <label for="course_term">Course Term:</label>
                                        <input  type="text" class="form-control"  onChange = {this.course_termChangeHandler} name="course_term"  required/>
                        </div>
               
                        

                        <div class="form-group">
                        <br/>
                        <input type="submit" class="btn btn-success full" onClick = {this.submitCourse} value="Create Course"/>
                        </div>
                        
                </div>


                </div>
</form>

                    </div>
                </div>

            </div>
         </div>
        )

}
}