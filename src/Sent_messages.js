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


export class Sent_messages extends Component {

    constructor() {
        super();
        this.state = {

            messages: []

        }

    }
    //get the books data from backend  
    componentDidMount() {

        axios.get('http://localhost:3001/inbox', { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    messages: this.state.messages.concat(response.data)
                });
            });
    }





    render() {



        //iterate over courses to create a table row
        let details = this.state.messages.map(item => {
            return (
                <tr>
                    <td>{item.from}</td>
                    <td>{item.message}</td>
                    <td>{item.date}</td>

                </tr>
            )
        })

        return (

            <div>



                <table class="table">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>Message</th>
                            <th>Date</th>
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