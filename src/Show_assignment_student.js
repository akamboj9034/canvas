import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from './Navbar';
import {Link} from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './index.css';
import {Sidenavbar} from './Sidenavbar';
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';
import {Show_submissions} from './Show_submissions';
import {Previous_submissions} from './Previous_submissions';


export class Show_assignment_student extends Component{

    constructor(){
        super();
        this.state = {  
            Assignments : [],
            authFlag:false,
            file: null,
            assignment_id:""
        }
        this.onFormSubmi = this.onFormSubmi.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    

    componentDidUpdate() {
       
        if (this.state.authFlag==true) {
            const {assignment_id} = this.props.match.params
            let id= {assignment_id};
            axios.get(`http://localhost:3001/show_assignment_faculty/${id.assignment_id}`,{headers: {'Authorization': localStorage.getItem('token')}})
        .then((response) => {
      
        //update the state with the response data
        this.setState({
            Assignments :response.data ,
            authFlag:false
           
        });
    });

        }

    }
    

    //get the books data from backend  
    componentDidMount(){
        const {assignment_id} = this.props.match.params
        let id= {assignment_id};
        axios.get(`http://localhost:3001/show_assignment_faculty/${id.assignment_id}`,{headers: {'Authorization': localStorage.getItem('token')}})
                .then((response) => {
                //update the state with the response data
                this.setState({
                    Assignments : this.state.Assignments.concat(response.data) ,
                    assignment_id:id.assignment_id
                });
            });
    }




    onFormSubmi(e){
      
        e.preventDefault();
    
        if (this.state.course_id=="" || this.state.file==null)
        {
            alert("please select a course and a file to upload");
    
        }else{
        const formData = new FormData();
        formData.append('myfile',this.state.file);
        formData.append('file_name',this.state.file.name);
        formData.append('assignment_id',this.state.assignment_id);
        formData.append('assignment_name',this.state.Assignments[0].assignment_name);
        formData.append('course_id',this.state.Assignments[0].course_id);
    
    
        axios.post("http://localhost:3001/submit_assignment",formData,{headers: {'Authorization': localStorage.getItem('token')}})
            .then((response) => {
                alert(response.data);
                this.setState({
                    authFlag:true
                })
    
            });
    
        }
    
    }
    
    
    
    
    onChange(e) {
        this.setState({file:e.target.files[0]});
    
    }
    render(){


               //iterate over courses to create a table row
               let details = this.state.Assignments.map(item => {

                return(
                   
                      

                                <div>
                                <h2>{item.assignment_name}</h2>

                                <hr/>

                                <p>Requirements: {item.assignment_requirements}</p>

                                <p>Due Date: {item.assignment_duedate}</p>

                                <p>Points: {item.assignment_points}</p>



                                <hr/>
<h2>Submit Assignment</h2>
<br/>

                                
                                <form onSubmit={this.onFormSubmi}>
                                              
                                              <input type="file" name="myfile"  onChange= {this.onChange} />
                                              
<br/>
<br/>
                                              <button type="submit" class="btn btn-primary">Submit</button>
                                          </form>
<br/>
                                          <h2>Previous submissions</h2>


                                          <Previous_submissions assignment_id={this.state.assignment_id} authFlag={this.state.authFlag}/>


                                </div>  
                )
            })
           //redirect based on successful login
        //    let redirectVar = null;
           let no_access = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
           if(cookie.load('user_type')=="faculty"){
            no_access=<Redirect to= "/dashboard"/>
        }
        return(
            

            <div>
            {/* {redirectVar} */}
            {no_access}
            <Navbar/>

        <div class="side_navigation container-fluid">

            <div class="row">
                <div class="col-md-2 col-sm-2">
                   
                <Sidenavbar/>
                </div>
                <div class="col-md-10 col-sm-10">
                <br/>
           
                <br/>
             

                                {/*Display the Tbale row based on data recieved*/}
                                {details}
              
                </div>
            </div>

        </div>
     </div>

        )

}
}