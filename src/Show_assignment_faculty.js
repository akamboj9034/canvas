import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './index.css';
import { Sidenavbar } from './Sidenavbar';
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';
import { Show_submissions } from './Show_submissions';
export class Show_assignment_faculty extends Component {

    constructor() {
        super();
        this.state = {
            Assignments: [],
            authFlag: false
        }

    }




    //get the books data from backend  
    componentDidMount() {
        const { assignment_id } = this.props.match.params
        let id = { assignment_id };
        axios.get(`http://localhost:3001/show_assignment_faculty/${id.assignment_id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    Assignments: this.state.Assignments.concat(response.data)
                });
            });
    }
    render() {


        //iterate over courses to create a table row
        let details = this.state.Assignments.map(item => {

            return (



                <div>
                    <h2>{item.assignment_name}</h2>

                    <hr />

                    <p>Requirements: {item.assignment_requirements}</p>

                    <p>Due Date: {item.assignment_duedate}</p>

                    <p>Points: {item.assignment_points}</p>



                    <hr />
                    <h4>All Submissions</h4>
                    <Show_submissions assignment_id={item._id} />







                </div>
            )
        })
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

                <div class="side_navigation container-fluid">

                    <div class="row">
                        <div class="col-md-2 col-sm-2">

                            <Sidenavbar />
                        </div>
                        <div class="col-md-10 col-sm-10">
                            <br />

                            <br />


                            {/*Display the Tbale row based on data recieved*/}
                            {details}

                        </div>
                    </div>

                </div>
            </div>

        )

    }
}