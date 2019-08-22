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



export class Enrolled extends Component{


    constructor(props){
        super(props);
        this.state = {  
            enrolled : [],
            authFlag : false
        }
   this.remove=this.remove.bind(this);
    }  



    componentDidUpdate() {
        const {course_id} = this.props.match.params
        let id= {course_id};
        if (this.state.authFlag==true) {
        axios.get(`http://localhost:3001/enrolled/${id.course_id}`,{headers: {'Authorization': localStorage.getItem('token')}})
        .then((response) => {
        //update the state with the response data
        this.setState({
            enrolled :response.data ,
            authFlag:false
           
        });
    });

        }

    }

    componentDidMount(){
        const {course_id} = this.props.match.params
       let id= {course_id};

        axios.get(`http://localhost:3001/enrolled/${id.course_id}`,{headers: {'Authorization': localStorage.getItem('token')}})
                .then((response) => {
                //update the state with the response data
                this.setState({
                    enrolled : this.state.enrolled.concat(response.data) 
                   
                });
            });
    }

    remove=(e)=>{


                                const {course_id} = this.props.match.params
                            let id= {course_id};
                                const value = e.target.value;
                               
                        const data={
                            username:value,
                            course_id:id.course_id
                        }

                        axios.post('http://localhost:3001/remove',data,{headers: {'Authorization': localStorage.getItem('token')}})
                        .then(response => {
                            if(response.status === 200){
                                this.setState({
                                    authFlag : true
                                })
                            }else{
                                this.setState({
                                    authFlag : false
                                })
                            }
                        

                          
                        });

                     }




    render(){
                       //iterate over books to create a table row
                       let details = this.state.enrolled.map(item => {

                        return(
                            <tr>
                               
                                <td>{item.username}</td>
                               
                                     <td><button class="btn btn-danger" onClick={this.remove} value={item.username}>Remove</button></td>
                                
                               
                            </tr>
                        )
                    })


        const {course_id} = this.props.match.params
        
           //redirect based on successful login
        //    let redirectVar = null;
           let no_access = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
           if(cookie.load('user_type')=="student"){
            no_access=<Redirect to= "/dashboard"/>
        }
        return(
            
        <div>
                {/* {redirectVar} */}
                {no_access}
                <Navbar/>

            <div class="side_navigation">

                <div class="row">
                    <div class="col-md-2 col-sm-2">
                       
                    <Sidenavbar/>
                    </div>
                    <div class="col-md-10 col-sm-10">

                        <h3>List of students enrolled for {course_id}</h3>
                    
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Student Name</th>
                                    <th>Action</th>
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