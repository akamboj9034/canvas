import React, { Component } from 'react';

import {Link} from 'react-router-dom';
export class Dashboard_student extends Component{

render(){

return(

<div>
<div class="row">
    <div class="col-md-4">
        <Link to="/search_course">
        <button class="btn btn-lg btn-warning">SEARCH COURSE</button>
        </Link>
    </div>
    <div class="col-md-4">
        <Link to="/course_list">
        <button class="btn btn-lg btn-warning">COURSES ENROLLED</button>
            </Link>
    </div>
 
</div>


</div>
)


}

}