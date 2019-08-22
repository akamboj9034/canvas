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
import {Recipient_list} from './Recipient_list';
import {Sent_messages} from './Sent_messages';

export class Inbox extends Component{

    constructor(){
        super();
        this.state = {  
            new_message:"",
            messages : [],
            authFlag : false,
            to:"",
            delivery_msg:""
        }
        this.sendMessage=this.sendMessage.bind(this);
        this.changeRecipient=this.changeRecipient.bind(this);
        
    }  


    componentDidUpdate() {

        if (this.state.authFlag==true) {
        
            axios.get('http://localhost:3001/sent_messages',{headers: {'Authorization': localStorage.getItem('token')}})
        .then((response) => {
        //update the state with the response data
        this.setState({
            messages :response.data ,
            authFlag:false 
           
        });
    });

        }

    }

    //get the books data from backend  
    componentDidMount(){
     
        axios.get('http://localhost:3001/sent_messages',{headers: {'Authorization': localStorage.getItem('token')}})
                .then((response) => {
                //update the state with the response data
                this.setState({
                    messages : this.state.messages.concat(response.data)
                });
            });
    }


sendMessage=(e)=>{

    this.setState({
        new_message:e.target.value
    })
}

changeRecipient(e){
    this.setState({
        to:e.target.value
    })
}
submitMessage = (e) => {

    //prevent page from refresh
    e.preventDefault();

if(this.state.to=="")
{
alert("please select a user to send message");
}else{
    const data = {
    
        message : this.state.new_message,
        to:this.state.to

    }
   
    //set the with credentials to true
    axios.defaults.withCredentials = true;

    //make a post request with the user data
    axios.post('http://localhost:3001/send_message',data,{headers: {'Authorization': localStorage.getItem('token')}})
        .then(response => {
            console.log("Status Code : ",response.status);
        
                this.setState({
                    authFlag : true,
                    delivery_msg:"message sent"
                })
                
      
        });
}


  }
  


    render(){



                       //iterate over courses to create a table row
                       let details = this.state.messages.map(item => {
                        return(
                            <tr>
                                <td>{item.to}</td>
                                <td>{item.message}</td>
                                <td>{item.date}</td>
                               
                            </tr>
                        )
                    })
           //redirect based on successful login
        //    let redirectVar = null;
        //    let no_access = null;
        //    if(!cookie.load('username')){
        //        redirectVar = <Redirect to= "/login"/>
        //    }
      
        return(
            
        <div>
                {/* {redirectVar} */}
           
                <Navbar/>

            <div class="side_navigation">

                <div class="row">
                    <div class="col-md-2 col-sm-2">
                       
                    <Sidenavbar/>
                    </div>
                    <div class="col-md-10 col-sm-10">
                    <h3>Send Message</h3>
                    <Recipient_list action={this.changeRecipient}/>
                    
                    <input type="text" name="message"   className="form-control" placeholder="Enter the Message" 
                                        onChange={this.sendMessage} /><br/>
                                        <button class="btn btn-success full"onClick={this.submitMessage}>SUBMIT</button>
<p className="delivery_message">{this.state.delivery_msg}</p>
<br/>
<br/>


<div className="row">
<div className="col-md-6">
<h3>Sent</h3>
                    <table class="table">
                            <thead>
                                <tr>
                                    <th>To</th>
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
<div className="col-md-6">
<h3>Received</h3>
<Sent_messages/>
</div>
</div>



              



                    </div>
                </div>

            </div>
         </div>
        )

}
}