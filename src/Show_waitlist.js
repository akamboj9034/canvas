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



export class Show_waitlist extends Component{


    constructor(props){
        super(props);
        this.state = {  
            waitlist : [],
            authFlag : false
        }
this.applyCode=this.applyCode.bind(this);
    }  

    componentDidUpdate() {

        if (this.state.authFlag==true) {
            axios.get('http://localhost:3001/show_waitlist',{headers: {'Authorization': localStorage.getItem('token')}})
        .then((response) => {
        //update the state with the response data
        this.setState({
            waitlist :response.data ,
            authFlag:false
           
        });
    });

        }

    }


    componentDidMount(){
    

        axios.get('http://localhost:3001/show_waitlist',{headers: {'Authorization': localStorage.getItem('token')}})
                .then((response) => {
                //update the state with the response data
                this.setState({
                    waitlist : this.state.waitlist.concat(response.data) 
                   
                });
            });
    }


applyCode(e){

    var data = 
    {
        "course_id": e.target.value,
    }
    axios.post('http://localhost:3001/apply_code/',data,{headers: {'Authorization': localStorage.getItem('token')}})
        .then(response =>{
            if(response.status === 200){
                alert(response.data);
                this.setState({
                    authFlag:true
                   
                });
            }
        });
}


    render(){
                       //iterate over books to create a table row
                       let details = this.state.waitlist.map(item => {
                 if(item.permission_code==0)
                 {
                    var button_type=<button class="btn btn-warning" disabled>Waitlist</button>;
                 }else{
                    var button_type=<button class="btn btn-success" value={item.course_id} onClick={this.applyCode}>Apply Code: {item.permission_code}</button>;
                 }
                        return(
                            <tr>
                                <td>{item.course_id}</td>
                               
                                     <td>{button_type}</td>
                                
                               
                            </tr>
                        )
                    })


     
        
           //redirect based on successful login
        //    let redirectVar = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
        //    if(cookie.load('user_type')){

        // }
        return(
            
   
                    
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Action</th>
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