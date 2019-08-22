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
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
const SortableItem = SortableElement(({ value }) => <div className="col-md-4">  <div class="course-box"><h4>Course ID:</h4>
    {value}<hr /> <Link to={`/show_course/${value}`}> <button class="btn btn-success">View</button></Link></div></div>);

function remove(e) {
    alert(e);
}
const SortableList = SortableContainer(({ items }) => {
    return (
        <div className="row">
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </div>
    );
});

export class Courses extends Component {

    constructor() {
        super();
        this.state = {
            courses: [],
            authFlag: false,
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
        }

        this.remove = this.remove.bind(this);
    }

    componentDidUpdate() {

        if (this.state.authFlag == true) {
            axios.get('http://localhost:3001/courses', { headers: { 'Authorization': localStorage.getItem('token') } })
                .then((response) => {
                    //update the state with the response data

                    this.setState({
                        courses: response.data,
                        authFlag: false

                    });

                });

        }

    }

    remove = (e) => {



        const value = e.target.value;

        const data = {

            course_id: value
        }

        axios.post('http://localhost:3001/remove_course', data, { headers: { 'Authorization': localStorage.getItem('token') } })
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

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ courses }) => ({
            courses: arrayMove(courses, oldIndex, newIndex),
        }));


        const data = {
            courses: this.state.courses
        }
        axios.post('http://localhost:3001/update_enrolled', data, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then(response => {


            });



    };



    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/courses', { headers: { 'Authorization': localStorage.getItem('token') } })
            .then((response) => {
                //update the state with the response data


                this.setState({
                    courses: this.state.courses.concat(response.data)
                });

            });
    }
    render() {


        //iterate over courses to create a table row
        let details = this.state.courses.map(item => {
            return (

                <div class="col-md-4" >
                    <div class="course-box">
                        <h4>Course ID: {item.course_id}</h4>
                        <h5>{item.course_name}</h5>
                        <hr />
                        <p>{item.course_description}</p>
                        <button class="btn btn-danger" onClick={this.remove} value={item.course_id}>Remove</button>


                    </div>
                </div>


            )
        })
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

                            <h3>Courses enrolled by you</h3>
                            <SortableList items={this.state.courses} onSortEnd={this.onSortEnd} axis="xy" />
                        </div>
                    </div>

                </div>
            </div>

        )

    }
}