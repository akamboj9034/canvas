import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from './Navbar';
import {Link} from 'react-router-dom';
import { FaImage } from 'react-icons/fa';
import './index.css';
import {Sidenavbar} from './Sidenavbar';
import axios from 'axios';



export class Upload_file extends Component{
constructor(props){
    super(props);

    this.state={
     
        course_id:"",
        courses : [],
        file: null


    }

    this.changecourse_id=this.changecourse_id.bind(this);

    this.onFormSubmi = this.onFormSubmi.bind(this);
this.onChange = this.onChange.bind(this);
}

    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/upload_file',{headers: {'Authorization': localStorage.getItem('token')}})
                .then((response) => {
                //update the state with the response data
                this.setState({
                    courses : this.state.courses.concat(response.data) 
                });
            });
    }



changecourse_id(e){
    this.setState({
        course_id:e.target.value
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
    formData.append('course_id',this.state.course_id);



    axios.post("http://localhost:3001/upload_file",formData,{headers: {'Authorization': localStorage.getItem('token')}})
        .then((response) => {
            alert(response.data);

        });

    }

}




onChange(e) {
    this.setState({file:e.target.files[0]});

}

    render(){

        let details = this.state.courses.map(item => {
            return(

                <option value={item.course_id}>{item.course_id}</option>
            )
        });


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

                    <div class="row">
                    <div class="col-md-4">


                    </div>

                    <div class="col-md-4">
                    <br/>
                    <br/>
                                    <h3 class="center">Upload a file</h3>
                                    <br/>




                                    <div class="form-group">
                                    <label for="course_id">For Course ID:</label>
                                <select class="form-control" name="course_id"  onChange={this.changecourse_id}>
                                <option value="">select a course</option>
                                    {details}
                                </select>
                                </div>

                                    <div class="form-group">

                                            <form onSubmit={this.onFormSubmi}>
                                              
                                                <input type="file" name="myfile"  onChange= {this.onChange} />
                                                
<br/>
<br/>
                                                <button type="submit" class="btn btn-primary">Upload</button>
                                            </form>
                                    </div>
                                    
                                  




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