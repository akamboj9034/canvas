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


export class Previous_submissions extends Component {

    constructor() {
        super();
        this.state = {
            submissions: [],

        }
    }

    componentDidUpdate() {

        if (this.state.authFlag == true || this.props.authFlag == true) {
            axios.get(`http://localhost:3001/previous_submissions/${this.props.assignment_id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
                .then((response) => {
                    //update the state with the response data
                    this.setState({
                        submissions: response.data,


                    });
                });

        }

    }

    //get the books data from backend  
    componentDidMount() {

        axios.get(`http://localhost:3001/previous_submissions/${this.props.assignment_id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    submissions: this.state.submissions.concat(response.data)
                });
            });
    }



    render() {


        //iterate over courses to create a table row
        let details = this.state.submissions.map(item => {
            if (item.graded == "no") {
                var button_type = <button class="btn btn-warning " disabled >Not graded</button>;
            } else {
                var button_type = <button class="btn btn-success " disabled >Graded: {item.graded}</button>;


            }
            return (
                <tr>
                    <td>{item.file_name}</td>
                    <td>{item.submitted_by}</td>
                    <td><button class="btn btn-primary white"><a href={"http://localhost:3000/web/viewer.html?file=" + item.file_name} target="blank">view file</a></button></td>
                    <td>{button_type}</td>
                </tr>
            )
        })

        return (



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




        )

    }
}