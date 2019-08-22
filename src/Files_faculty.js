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

export class Files_faculty extends Component {

    constructor() {
        super();
        this.state = {
            Files: [],
            authFlag: false
        }

    }




    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/files_faculty', { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    Files: this.state.Files.concat(response.data)
                });
            });
    }
    render() {


        //iterate over courses to create a table row
        let details = this.state.Files.map(item => {

            return (
                <tr>
                    <td>{item.course_id}</td>
                    <td>{item.file_name}</td>
                    <td><button class="btn btn-primary white"><a href={"./web/viewer.html?file=" + item.file_name} target="blank">view file</a></button></td>

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
                            <br />
                            <br />
                            <Link to="/upload_file" class="right"><button class="btn btn-primary"><FaPlusCircle /> Upload File</button></Link>
                            <br />
                            <br />
                            <br />
                            <h3>Files uploaded by you</h3>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>File Name</th>

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