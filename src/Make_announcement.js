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


export class Make_announcement extends Component {

    constructor() {
        super();
        this.state = {
            new_announcement: "",
            announcements: [],
            authFlag: false
        }
        this.makeAnnouncement = this.makeAnnouncement.bind(this);
    }
    //get the books data from backend  
    componentDidMount() {
        const { course_id } = this.props.match.params
        let id = { course_id };
        axios.get(`http://localhost:3001/make_announcement/${id.course_id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    announcements: this.state.announcements.concat(response.data)
                });
            });
    }


    makeAnnouncement = (e) => {

        this.setState({
            new_announcement: e.target.value
        })
    }


    submitAnnouncement = (e) => {
        const { course_id } = this.props.match.params
        let id = { course_id };
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            course_id: id.course_id,
            announcement: this.state.new_announcement,


        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.post('http://localhost:3001/make_announcement_post', data, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                console.log("Status Code : ", response.status);

                this.setState({
                    authFlag: true
                })



            });
    }


    componentDidUpdate() {
        const { course_id } = this.props.match.params
        let id = { course_id };
        if (this.state.authFlag == true) {
            axios.get(`http://localhost:3001/make_announcement/${id.course_id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
                .then((response) => {
                    //update the state with the response data

                    this.setState({
                        announcements: response.data,
                        authFlag: false

                    });
                });

        }

    }

    render() {



        //iterate over courses to create a table row
        let details = this.state.announcements.map(item => {
            return (
                <tr>
                    <td>{item.course_id}</td>
                    <td>{item.announcement}</td>
                    <td>{item.created_by}</td>
                    <td>{item.created_at}</td>

                </tr>
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

                <div class="side_navigation">

                    <div class="row">
                        <div class="col-md-2 col-sm-2">

                            <Sidenavbar />
                        </div>
                        <div class="col-md-10 col-sm-10">
                            <h3>make Announcement</h3>
                            <input type="text" name="announcement" className="form-control" placeholder="Enter the Announcement"
                                onChange={this.makeAnnouncement} /><br />
                            <button class="btn btn-success full" onClick={this.submitAnnouncement}>SUBMIT</button>
                            <br />
                            <br />
                            <h3>Your Announcements</h3>


                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Announcement</th>
                                        <th>Created By</th>
                                        <th>Created At</th>
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