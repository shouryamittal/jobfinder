import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../authContext';
import JobPostForm from './jobPostForm';
import jwt_decode from 'jwt-decode';
import "../../styles/recruiterDashBaord.css";
import request from '../../utils/request';
import STATUS from '../../utils/statusCodes';
import JobList from './jobList';
import JobDetailsCard from './jobDetailsCard';

function RecruiterDashboard() {
    const {auth} = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [jobAddCount, setJobCount] = useState(0);
    let decodedToken = jwt_decode(auth.token);

    useEffect(() => {
        (async () => {
            let response = await request(`/job/all/${decodedToken.userId}`, 'GET');
            let status = response.status;
            response = await response.json();
            if(status === STATUS.SUCCESS) {
                setJobs(response.data);
            }
        })();
    }, [jobAddCount,decodedToken.userId]);

    return(
        <div className="recruiterDashbaord container">
            <div className="userGreeting">Welcome {decodedToken.firstName}</div>
            <div className="row dashboardRow">
                <div className="col-xs-12 col-sm-12 col-md-4 formContainer">
                    <div className="postJobText">Post a new Job</div>
                    <JobPostForm userId={decodedToken.userId} jobAddCount = {jobAddCount} setJobCount = {setJobCount}/>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-8 jobsList">
                    <div className="jobListCaption">Jobs Posted by you</div>
                    {
                        jobs.length > 0 ? 
                        <JobList jobs={jobs} render={(props) => <JobDetailsCard job={props}/>}/>: 
                        <div>You have not posted any job</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default RecruiterDashboard;