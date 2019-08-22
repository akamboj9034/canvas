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



export class In_waitlist extends Component {


    constructor(props) {
        super(props);
        this.state = {
            waitlist: [],
            authFlag: false
        }
        this.codeChange = this.codeChange.bind(this);
    }



    componentDidUpdate() {
        const { course_id } = this.props.match.params
        let id = { course_id };
        if (this.state.authFlag == true) {
            axios.get(`http://localhost:3001/in_waitlist/${id.course_id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
                .then((response) => {
                    //update the state with the response data
                    this.setState({
                        waitlist: response.data,
                        authFlag: false

                    });
                });

        }

    }

    componentDidMount() {
        const { course_id } = this.props.match.params
        let id = { course_id };

        axios.get(`http://localhost:3001/in_waitlist/${id.course_id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    waitlist: this.state.waitlist.concat(response.data)

                });
            });
    }

    codeChange = (e) => {

        this.setState({
            button_status: "true"
        })
        const { course_id } = this.props.match.params
        let id = { course_id };
        const value = e.target.value;

        const data = {
            username: value,
            course_id: id.course_id
        }

        axios.post('http://localhost:3001/code', data, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then(response => {

                this.setState({
                    authFlag: true
                })




            });

    }




    render() {
        //iterate over books to create a table row
        let details = this.state.waitlist.map(item => {
            if (item.permission_code == "0") {
                var button_type = <button class="btn btn-success" onClick={this.codeChange} value={item.username}>Give Code</button>;
            } else {
                var button_type = <button class="btn btn-danger" disabled>Code given</button>;
            }
            return (
                <tr>
                    <td>{item.course_id}</td>
                    <td>{item.username}</td>

                    <td>{button_type}</td>


                </tr>
            )
        })


        const { course_id } = this.props.match.params

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

                            <h3>List of students in waitlist for {course_id}</h3>

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Student Name</th>
                                        <th>Action</th>
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