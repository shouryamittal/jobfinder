import React, {useContext, useEffect, useState} from 'react';
import "../../styles/recruiterDashBaord.css";
import request from '../../utils/request';
import STATUS from '../../utils/statusCodes';
import JobList from './jobList';
import JobApplicationCard from './jobApplicationCard';
import "../../styles/candidateDashboard.css";
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../../authContext';
import SearchBar from './searchBar';

function CandidateDashboard() {
    const [data, setData] = useState({jobs:[], selectedTabId:0, jobText:'All Jobs'})
    const {auth} = useContext(AuthContext);
    let decodedToken = jwt_decode(auth.token);

    useEffect(() => {
        (async ()=> {
            let {jobs, status} = await fetchJobs(`/job/all/available/${decodedToken.userId}`);
            if(status === STATUS.SUCCESS){
                setData({jobs, selectedTabId:0, jobText:'All Jobs'})
            }
        })();
    },[]);

    async function fetchAllJobs(e) {
        let {jobs, status} = await fetchJobs(`/job/all/available/${decodedToken.userId}`);
        if(status === STATUS.SUCCESS){
            setData({jobs:jobs, selectedTabId:parseInt(e.target.value), jobText:'All Jobs'})
        }
    }

    async function fetchAppliedJobs(e) {
        let {jobs, status} = await fetchJobs(`/job/applied/${decodedToken.userId}`)
        if(status === STATUS.SUCCESS) {
            setData({jobs:jobs, selectedTabId:parseInt(e.target.value), jobText:'Applied Jobs'})
        }
    }
    return(
        <div className="candidateDashboard container">
            <SearchBar setData={setData}/>
            <div className="jobText">{data.jobText}</div>
            <div className="tabsContainer">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button className={`nav-link ${data.selectedTabId === 0 ? "active":""}`} value="0" onClick={fetchAllJobs}>All Jobs</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${data.selectedTabId === 1 ? "active":""}`} value="1" onClick={fetchAppliedJobs}>Applied Jobs</button>
                    </li>
                </ul>
            </div>
            <div className="infoContainer">
                {
                    data.jobs.length > 0 ? <JobList jobs={data.jobs} render={(props) => <JobApplicationCard job={props} userId={decodedToken.userId} renderForAllJob={data.selectedTabId === 0}/>}/>:
                    <div className="noContent">No Jobs Available</div>
                }
            </div>
        </div>
    );
}


async function fetchJobs(url) {
    let resp = await request(url, 'GET');
    let status = resp.status;
    resp = await resp.json(); 
    let jobs = resp.data;
    return {jobs, status};
}

export default CandidateDashboard;