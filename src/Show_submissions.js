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


export class Show_submissions extends Component {

    constructor() {
        super();
        this.state = {
            submissions: [],
            grade: "",
            authFlag: false
        }
        this.changeGrade = this.changeGrade.bind(this);
        this.submitGrade = this.submitGrade.bind(this);
    }

    componentDidUpdate() {

        if (this.state.authFlag == true) {
            axios.get(`http://localhost:3001/show_submissions/${this.props.assignment_id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
                .then((response) => {
                    //update the state with the response data
                    this.setState({
                        submissions: response.data,
                        authFlag: false

                    });
                });

        }

    }

    //get the books data from backend  
    componentDidMount() {

        axios.get(`http://localhost:3001/show_submissions/${this.props.assignment_id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    submissions: this.state.submissions.concat(response.data)
                });
            });
    }

    submitGrade(e) {

        const data = {

            submission_id: e.target.value,
            grade: this.state.grade
        }
        alert(this.state.grade);
        axios.post('http://localhost:3001/grade_assignment', data, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })

                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
    }

    changeGrade(e) {
        this.setState({
            grade: e.target.value
        })
    }


    render() {


        //iterate over courses to create a table row
        let details = this.state.submissions.map(item => {
            if (item.graded == "no") {
                var button_type = <button class="btn btn-success " value={item._id} onClick={this.submitGrade}>Grade</button>;
                var input_type = <input type="text" class="form-control" name="grade" onChange={this.changeGrade} />;
            } else {
                var button_type = <button class="btn btn-success " disabled >Graded</button>;
                var input_type = "";

            }
            return (
                <tr>
                    <td>{item.file_name}</td>
                    <td>{item.submitted_by}</td>
                    <td><button class="btn btn-primary white"><a href={"http://localhost:3000/web/viewer.html?file=" + item.file_name} target="blank">view file</a></button></td>
                    <td>{input_type}</td>
                    <td>{button_type}</td>
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
                <table class="table">
                    <thead>
                        <tr>
                            <th>File name</th>
                            <th>Submitted By</th>
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