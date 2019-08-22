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


export class Create_quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quiz_name: "",
            course_id: "",
            courses: []


        }

        this.changecourse_id = this.changecourse_id.bind(this);
        this.changequiz_name = this.changequiz_name.bind(this);
        this.createQuiz = this.createQuiz.bind(this);
    }

    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/create_quiz', { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    courses: this.state.courses.concat(response.data)
                });
            });
    }


    changequiz_name(e) {
        this.setState({
            quiz_name: e.target.value
        });
    }
    changecourse_id(e) {
        this.setState({
            course_id: e.target.value
        });
    }

    createQuiz() {

        if (this.state.course_id == "") {
            alert("please select a course to create a quiz for");

        } else {
            const data = {
                quiz_name: this.state.quiz_name,
                course_id: this.state.course_id
            }

            axios.post('http://localhost:3001/create_quiz_post', data, { headers: { 'Authorization': localStorage.getItem('token') } })
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
                                    <h3 class="center">Create a Quiz</h3>
                                    <br />
                                    <div class="form-group">
                                        <label for="quiz_name">Quiz name:</label>
                                        <input type="text" name="quiz_name" class="form-control" onChange={this.changequiz_name} />
                                    </div>

                                    <div class="form-group">
                                        <label for="course_id">For Course ID:</label>
                                        <select class="form-control" name="course_id" onChange={this.changecourse_id}>
                                            <option value="">select a course</option>
                                            {details}
                                        </select>
                                    </div>

                                    <button class="btn btn-success full" onClick={this.createQuiz}>Create Quiz</button>



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