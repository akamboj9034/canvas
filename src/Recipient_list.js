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


export class Recipient_list extends Component {

    constructor() {
        super();
        this.state = {

            recipients: []

        }

    }
    //get the books data from backend  
    componentDidMount() {

        axios.get('http://localhost:3001/recipients', { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    recipients: this.state.recipients.concat(response.data)
                });
            });
    }





    render() {



        //iterate over courses to create a table row
        let details = this.state.recipients.map(item => {
            return (

                <option value={item.username}>{item.username}</option>
            )
        });
        //redirect based on successful login
        //    let redirectVar = null;
        //    let no_access = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }

        return (

            <div>


                <div class="form-group">
                    <label for="users">For Course ID:</label>
                    <select class="form-control" name="users" onChange={this.props.action}>
                        <option value="">select a user</option>
                        {details}
                    </select>
                </div>




            </div>
        )

    }
}