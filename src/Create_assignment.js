import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import { FaImage } from 'react-icons/fa';
import './index.css';
import { Sidenavbar } from './Sidenavbar';
import axios from 'axios';



export class Create_assignment extends Component {
    constructor(props) {
        super(props);

        this.state = {

            course_id: "",
            courses: [],
            assignment_name: "",
            assignment_requirements: "",
            assignment_duedate: "",
            assignment_points: ""



        }

        this.changeAssignmentName = this.changeAssignmentName.bind(this);
        this.changeAssignmentRequirements = this.changeAssignmentRequirements.bind(this);
        this.changeAssignmentDueDate = this.changeAssignmentDueDate.bind(this);
        this.changeAssignmentPoints = this.changeAssignmentPoints.bind(this);
        this.changecourse_id = this.changecourse_id.bind(this);
        this.createAssignment = this.createAssignment.bind(this);
    }

    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/upload_file', { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    courses: this.state.courses.concat(response.data)
                });
            });
    }



    changecourse_id(e) {
        this.setState({
            course_id: e.target.value
        });
    }





    createAssignment(e) {
        e.preventDefault();

        if (this.state.course_id == "" || this.state.assignment_name == "" || this.state.assignment_requirements == "" || this.state.assignment_duedate == "" || this.state.assignment_points == "") {
            alert("please select a course and a file to upload and all details");

        } else {
            const data = {

                course_id: this.state.course_id,
                assignment_name: this.state.assignment_name,
                assignment_requirements: this.state.assignment_requirements,
                assignment_duedate: this.state.assignment_duedate,
                assignment_points: this.state.assignment_points
            }


            axios.post("http://localhost:3001/create_assignment", data, { headers: { 'Authorization': localStorage.getItem('token') } })
                .then((response) => {
                    alert(response.data);

                });
        }
    }

    changeAssignmentName(e) {

        this.setState({
            assignment_name: e.target.value
        })
    }


    changeAssignmentRequirements(e) {

        this.setState({
            assignment_requirements: e.target.value
        })
    }
    changeAssignmentDueDate(e) {

        this.setState({
            assignment_duedate: e.target.value
        })
    }
    changeAssignmentPoints(e) {

        this.setState({
            assignment_points: e.target.value
        })
    }



    render() {

        let details = this.state.courses.map(item => {
            return (

                <option value={item.course_id}>{item.course_id}</option>
            )
        });


        //redirect based on successful login
        //    let redirectVar = null;
        let no_access = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
        if (cookie.load('user_type') == "student") {
            no_access = <Redirect to="/dashboard" />
        }

        return (

            <div>
                {/* {redirectVar} */}
                {no_access}
                <Navbar />

                <div class="side_navigation">

                    <div class="row">
                        <div class="col-md-2 col-sm-2">

                            <Sidenavbar />
                        </div>
                        <div class="col-md-10 col-sm-10">

                            <div class="row">
                                <div class="col-md-4">


                                </div>

                                <div class="col-md-4">
                                    <br />
                                    <br />
                                    <h3 class="center">Upload a file</h3>
                                    <br />




                                    <div class="form-group">
                                        <label for="course_id">For Course ID:</label>
                                        <select class="form-control" name="course_id" onChange={this.changecourse_id}>
                                            <option value="">select a course</option>
                                            {details}
                                        </select>
                                    </div>

                                    <div class="form-group">

                                        <label for="assignment_name">Assignment name</label>
                                        <input type="text" class="form-control" name="assignment_name" onChange={this.changeAssignmentName} />
                                    </div>

                                    <div class="form-group">

                                        <label for="assignment_requirements">Requirements</label>
                                        <input type="text" class="form-control" name="assignment_requirements" onChange={this.changeAssignmentRequirements} />
                                    </div>

                                    <div class="form-group">

                                        <label for="">Due date</label>
                                        <input type="text" class="form-control" name="assignment_duedate" onChange={this.changeAssignmentDueDate} />
                                    </div>

                                    <div class="form-group">
                                        <label for="">Points</label>
                                        <input type="text" class="form-control" name="assignment_points" onChange={this.changeAssignmentPoints} />
                                    </div>


                                    <button class="btn btn-success" onClick={this.createAssignment}>Create Assignment</button>


                                </div>
                                <div class="col-md-4">


                                </div>


                            </div>




                        </div>
                    </div>

                </div>
            </div>
        )

    }
}