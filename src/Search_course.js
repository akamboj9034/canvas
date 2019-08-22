import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar} from './Navbar';
import {Link} from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './index.css';
import {Sidenavbar} from './Sidenavbar';
import {Search_results} from './Search_results';
import axios from 'axios';

export class Search_course extends Component{

    constructor(props){
        super(props);
        console.log(props);

        this.state = {
            courses: [],
            filter:"id",
            search_value:"",
            authFlag:false,
            current_page:0
        }

        //bind

        this.searchCourse = this.searchCourse.bind(this);
        this.searchFilter = this.searchFilter.bind(this);

    }

    componentDidUpdate() {
        const {course_id} = this.props.match.params
        let id= {course_id};
        if (this.state.authFlag==true) {
            axios.get(`http://localhost:3001/search?page=${this.state.current_page}`,{headers: {'Authorization': localStorage.getItem('token')}})
        .then((response) => {
        //update the state with the response data
        this.setState({
            courses: response.data,
            authFlag:false
           
        });
       
    });
    
        }
    
    }
    
    componentDidMount(){
        console.log('Component Did Mount of Products Main');
        axios.get(`http://localhost:3001/search?page=${this.state.current_page}`,{headers: {'Authorization': localStorage.getItem('token')}})
            .then(response =>{
          
                    console.log(response.data);
                    this.setState({
                        courses: response.data
                    })
       
                
            });
    }


    searchFilter = (e) => {
        this.setState({
            filter : e.target.value,
            search_value:""
        })
    }

    searchCourse = (event)=>{
        console.log('search');
        const target = event.target;
       // const name = target.name;
        const value = target.value;
        this.setState({
          
            search_value:event.target.value
        })
        var data = 
        {
            "search": value,
            "filter":this.state.filter
        }
        axios.post('http://localhost:3001/search_post/',data,{headers: {'Authorization': localStorage.getItem('token')}})
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({
                        courses: response.data,
                       
                    });
                }
            });
    }


    handlePrevious=()=>
    {
        let t=this.state.current_page-1;
        if(t<0)
        {
            t=0;
            alert("no more data");
        }else{
            this.changestate(-1);
        }

       
      
        axios.get(`http://localhost:3001/search?page=${t}`,{headers: {'Authorization': localStorage.getItem('token')}})
        .then(response =>{
      
                console.log(response.data);
 
     this.setState({
        courses: response.data,
       
    });

            
        });


    }

    handlenext=()=>
    {
        this.changestate(1);
    let t=this.state.current_page+1;
   
        axios.get(`http://localhost:3001/search?page=${t}`,{headers: {'Authorization': localStorage.getItem('token')}})
        .then(response =>{
      
                console.log(response.data);
                if(response.data=="error")
                {  
                    alert("no more data");
                    this.changestate(-1);

                }else{   
                     this.setState({
                    courses: response.data,
                   
                });

                }
              
   
            
        });
    }


changestate(e){
this.setState({
    current_page:this.state.current_page+e
})
}


    render(){
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

            <div class="side_navigation">

                <div class="row">
                    <div class="col-md-2 col-sm-2">
                       
                    <Sidenavbar/>
                    </div>
                    <div class="col-md-10 col-sm-10">
                    <h3 class="center">Search for courses</h3>

                    <div class="row">
                        <div class="col-md-4 col-sm-10">
                                 <div class="form-group">
                                <select class="form-control" name="filter"  onChange={this.searchFilter}>
                                    <option value="id">search by id</option>
                                    <option value="name">search by name</option>
                                    <option value="greater">greater than id</option>
                                    <option value="less">less than id</option>
                                </select>
                                </div>
                        </div>
                        <div class="col-md-8">
                                <input type="text" name="search" id="search_bar" value={this.state.search_value} className="form-control" placeholder="Search" 
                                        onChange={this.searchCourse} />
                        </div>



                    </div>
                                  


                              
                                

                                <Search_results courses={this.state.courses}/>

<br/>
<br/>
<button class="btn btn-primary left"  onClick={this.handlePrevious}>previous</button>
<button class="btn btn-primary right"  onClick={this.handlenext}>next</button>
                    </div>
                </div>

            </div>
         </div>
        )

}
}