import React, { useState } from 'react';
import request from '../../utils/request';
import STATUS from '../../utils/statusCodes';

function JobDetailsCard(props) {
    const [showJobInfo, setShowJobInfo] = useState(true);
    const [fetchErr, setFetchErr] = useState('');
    const [candidates, setCandidates] = useState([]);
    let job = props.job;

    async function fetchAllCandidates() {
        let resp = await request(`/job/${job.jobId}/candidates`, 'GET');
        let status = resp.status;
        resp = await resp.json();
        if(status !== STATUS.SUCCESS) {
            let err = resp.errs[0].msg;
            setFetchErr(err);
        }
        else {
            setShowJobInfo(false);
            setCandidates(resp.data)
        }
    }

    function CloseCandidateList() {
        setShowJobInfo(true);
    }

    return (
        <div className="card">
            {showJobInfo ? <div className="jobInfo">
                <div className="card-header d-flex justify-content-between">
                    <div>{job.title}</div>
                    <div>{job.postedOn}</div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{job.orgName}</h5>
                    <p className="card-text">{job.description}</p>
                    {fetchErr?<p className="errClass">{fetchErr}</p>:null}
                    <button type="button" className="btn btn-primary" onClick={fetchAllCandidates}>See all Candidates</button>
                </div>
            </div>:
            <div className="candidateList position-relative">
                <div className="closeBtn" onClick={CloseCandidateList}>&#10006;</div>
                <ul class="list-group list-group-flush">
                {
                    candidates.map(item => {
                        return <li class="list-group-item d-flex justify-content-between"><span className="fw-bold">{item.firstName}</span><span>{item.email}</span></li>
                    })
                }
                </ul>
                    
            </div>}
        </div>
    )
}

export default JobDetailsCard;