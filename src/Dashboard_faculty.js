import React, { Component } from 'react';

import {Link} from 'react-router-dom';
export class Dashboard_faculty extends Component{

render(){

return(

<div>
<div class="row">
    <div class="col-md-4">
        <Link to="/create_course">
        <button class="btn btn-lg btn-warning">CREATE COURSE</button>
        </Link>
    </div>
    <div class="col-md-4">
        <Link to="/course_list">
        <button class="btn btn-lg btn-warning">COURSES CREATED</button>
            </Link>
    </div>
    <div class="col-md-4">
    <Link to="/Quiz">
    <button class="btn btn-lg btn-warning">QUIZ</button>
            </Link>
    </div>
</div>
<br/>
<br/>
<br/>
<div class="row">
    <div class="col-md-4">
        <Link to="/assignments_faculty">
        <button class="btn btn-lg btn-warning">ASSIGNMENTS</button>
        </Link>
    </div>
    <div class="col-md-4">
        <Link to="/announcements_faculty">
        <button class="btn btn-lg btn-warning">ANNOUNCEMENTS</button>
            </Link>
    </div>
    <div class="col-md-4">
    <Link to="/files_faculty">
    <button class="btn btn-lg btn-warning">FILES</button>
            </Link>
    </div>
</div>
</div>
)


}

}