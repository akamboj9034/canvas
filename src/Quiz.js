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

export class Quiz extends Component {

    constructor() {
        super();
        this.state = {
            Quiz: [],
            authFlag: false
        }

    }

    componentDidUpdate() {

        if (this.state.authFlag == true) {
            axios.get('http://localhost:3001/quiz', { headers: { 'Authorization': localStorage.getItem('token') } })
                .then((response) => {
                    //update the state with the response data
                    this.setState({
                        Quiz: response.data,
                        authFlag: false

                    });
                });

        }

    }

    publish = (e) => {



        const value = e.target.value;

        const data = {

            quiz_id: value
        }

        axios.post('http://localhost:3001/publish_quiz', data, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                    alert(response.data);
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });

    }
    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/quiz', { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    Quiz: this.state.Quiz.concat(response.data)
                });
            });
    }
    render() {


        //iterate over courses to create a table row
        let details = this.state.Quiz.map(item => {
            if (item.publish == "yes") {
                var button_type = <button class="btn btn-success" disabled>Published</button>;
                var button_type2 = <button class="btn btn-success" disabled>Add questions</button>;
            } else {
                var button_type = <button class="btn btn-primary" onClick={this.publish} value={item._id}>Publish</button>;
                var button_type2 = <Link to={`/add_questions/${item._id}`}><button class="btn btn-primary" >Add Questions</button></Link>;

            }
            return (
                <tr>
                    <td>{item.course_id}</td>
                    <td>{item.quiz_name}</td>
                    <td>{button_type}</td>
                    <td>{button_type2}</td>

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
                            <Link to="/create_quiz" class="right"><button class="btn btn-primary"><FaPlusCircle /> Create Quiz</button></Link>
                            <br />
                            <br />
                            <br />
                            <h3>Quiz created by you</h3>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Course ID</th>
                                        <th>Quiz Name</th>
                                        <th>Publish</th>

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