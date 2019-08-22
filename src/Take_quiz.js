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

export class Take_quiz extends Component {

    constructor() {
        super();
        this.state = {
            Questions: [],
            authFlag: false,
            score: 0,
            counter: 0,
            selected_answer: "",
            quiz_id: ""
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.changeSelectedAnswer = this.changeSelectedAnswer.bind(this);
    }




    //get the books data from backend  
    componentDidMount() {
        const { quiz_id } = this.props.match.params
        let id = { quiz_id }
        axios.get(`http://localhost:3001/take_quiz/${id.quiz_id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data
                this.setState({
                    Questions: this.state.Questions.concat(response.data),
                    quiz_id: id.quiz_id


                });

            });
    }

    changeSelectedAnswer(e) {
        this.setState({
            selected_answer: e.target.value
        })


    }


    nextQuestion(e) {
        if (this.state.selected_answer == this.state.Questions[this.state.counter].correct_answer) {

            this.setState({
                score: this.state.score + 1,
                counter: this.state.counter + 1,
                authFlag: true
            });

        } else {

            this.setState({

                counter: this.state.counter + 1,
                authFlag: true
            })
            alert("wrong answer");

        }

        if (this.state.counter == this.state.Questions.length - 1) {

            const data = {
                quiz_id: this.state.quiz_id,
                score: this.state.score
            }
            alert(this.state.score);
            axios.post("http://localhost:3001/take_test", data, { headers: { 'Authorization': localStorage.getItem('token') } })
                .then((response) => {

                    this.setState({
                        authFlag: true
                    })

                });

        }


    }
    render() {

        if (this.state.Questions.length > 0) {
            if (this.state.counter == this.state.Questions.length) {
                var details = <h2>Quiz is completed. Your score is {this.state.score}</h2>
            } else {

                var details =
                    <div>
                        <h5>Question {this.state.counter + 1}: {this.state.Questions[this.state.counter].question_name}</h5>
                        <br />
                        <br />
                        <div class="form-group">
                            <label class="radio"><input type="radio" name="correct_answer" value="A" onChange={this.changeSelectedAnswer} /> {this.state.Questions[this.state.counter].option_a}</label>
                        </div>
                        <div class="form-group">
                            <label class="radio"><input type="radio" name="correct_answer" value="B" onChange={this.changeSelectedAnswer} /> {this.state.Questions[this.state.counter].option_b}</label>

                        </div>
                        <div class="form-group">
                            <label class="radio"><input type="radio" name="correct_answer" value="C" onChange={this.changeSelectedAnswer} /> {this.state.Questions[this.state.counter].option_c}</label>

                        </div>
                        <div class="form-group">
                            <label class="radio"><input type="radio" name="correct_answer" value="D" onChange={this.changeSelectedAnswer} /> {this.state.Questions[this.state.counter].option_d}</label>

                        </div>


                        <button class="btn btn-primary" onClick={this.nextQuestion}>Next</button>

                    </div>;
            }






        }

        //redirect based on successful login
        //    let redirectVar = null;
        let no_access = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
        if (cookie.load('user_type') == "faculty") {
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

                            {details}


                        </div>
                    </div>

                </div>
            </div>

        )

    }
}