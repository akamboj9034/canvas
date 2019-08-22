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
import {Show_submissions} from './Show_submissions';
export class Show_course extends Component{

    constructor(){
        super();
        this.state = {  
            courses : [],
            authFlag:false
        }
        
    }
    



    //get the books data from backend  
    componentDidMount(){
        const {course_id} = this.props.match.params
        let id= {course_id};
        axios.get(`http://localhost:3001/show_course/${id.course_id}`,{headers: {'Authorization': localStorage.getItem('token')}})
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
                   
                      

                                <div>
                                <h2>Course id: {item.course_id}</h2>

                                <hr/>

                                <p>Course name: {item.course_name}</p>

                                <p>Description: {item.course_description}</p>

                                <p>Department: {item.course_dept}</p>

                                <p>Course room: {item.course_room}</p>

                                <p>Course capacity : {item.course_capacity}</p>

                                <p>Waitlist capacity: {item.waitlist_capacity}</p>

                                <p>Course term: {item.course_term}</p>

                                <p>Created by: {item.created_by}</p>



                                <hr/>



                        <Link to={`/all_enrolled/${item.course_id}`}> <button class="btn btn-success">All Enrolled</button></Link>
                        <Link to={`/announcements_student/${item.course_id}`}> <button class="btn btn-success">Announcements</button></Link>
                        <Link to={`/assignments_student/${item.course_id}`}> <button class="btn btn-success">Assignments</button></Link>
                        <Link to={`/quiz_list/${item.course_id}`}> <button class="btn btn-success">Quiz</button></Link>
                        <Link to={`/grades/${item.course_id}`}> <button class="btn btn-success">Grades</button></Link>
                        <Link to={`/files_student/${item.course_id}`}> <button class="btn btn-success">Files</button></Link>
                        
                        


                                </div>  
                )
            })
           //redirect based on successful login
        //    let redirectVar = null;
           let no_access = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
           if(cookie.load('user_type')=="faculty"){
            no_access=<Redirect to= "/dashboard"/>
        }
        return(
            

            <div>
            {/* {redirectVar} */}
            {no_access}
            <Navbar/>

        <div class="side_navigation container-fluid">

            <div class="row">
                <div class="col-md-2 col-sm-2">
                   
                <Sidenavbar/>
                </div>
                <div class="col-md-10 col-sm-10">
                <br/>
           
                <br/>
             

                                {/*Display the Tbale row based on data recieved*/}
                                {details}
              
                </div>
            </div>

        </div>
     </div>

        )

}
}