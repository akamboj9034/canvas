import React, { Component } from 'react';
import axios from 'axios';
export class Search_results extends Component {

    constructor(props) {
        super(props);
        console.log(props);
   
        this.enroll=this.enroll.bind(this);
        this.waitlist=this.waitlist.bind(this);
    }


    enroll=(e)=>{


        const course_id = e.target.value;
       
const data={
   
    course_id:course_id
}

axios.post('http://localhost:3001/enroll',data,{headers: {'Authorization': localStorage.getItem('token')}})
.then(response => {
    if(response.status === 200){
        this.setState({
            authFlag : true
        })
        alert(response.data);
    }else{
        this.setState({
            authFlag : false
        })
    }

});

}





waitlist=(e)=>{


    const course_id = e.target.value;
   
const data={

course_id:course_id
}

axios.post('http://localhost:3001/waitlist',data,{headers: {'Authorization': localStorage.getItem('token')}})
.then(response => {
if(response.status === 200){
    this.setState({
        authFlag : true
    })
    alert(response.data);
}else{
    this.setState({
        authFlag : false
    })
}

});

}


    render() {

        var courseResult = null;

        if (this.props.courses != null) {
            courseResult = this.props.courses.map(course => {
                if(course.space_left!=0)
                {
                        var button_type=<button class="btn btn-primary" onClick={this.enroll} value={course.course_id}>Enroll</button>;
                }else{

                    if(course.in_waitlist===course.waitlist_capacity)
                    {   var button_type=<button class="btn btn-danger"  value={course.course_id}>No space</button>;
              

                    }else{
                        var button_type=<button class="btn btn-warning" onClick={this.waitlist} value={course.course_id}>Waitlist</button>;
              
                    }

                 
                }
                return (
                    <tr   key={course.course_id}>
                     
                            <td>{course.course_id}</td>
                            <td>{course.course_name}</td>
                            <td>{course.course_description}</td>
                            <td>{course.course_room}</td>
                            <td>{course.course_capacity}</td>
                            <td>{course.waitlist_capacity}</td>
                            <td>{course.course_term}</td>
                            <td>{course.in_waitlist}</td>
                            <td>{course.space_left}</td>
                            <td>{course.created_by}</td>
                            <td>{button_type}</td>
                        </tr>
                  
                )
            })
        }

        return (

                      <table class="table">
                      <thead>
                          <tr>
                              <th>Course ID</th>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Room</th>
                              <th>Course Capacity</th>
                              <th>Waitlist Capacity</th>
                              <th>Term</th>
                              <th>In waitlist</th>
                              <th>Seats left</th>
                              <th>Created by</th>
                          </tr>
                      </thead>
                      <tbody>
                          {/*Display the Tbale row based on data recieved*/}
                          {courseResult}
                      </tbody>
                  </table>



        )
    }
}
