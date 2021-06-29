import React, {useState, useEffect} from 'react';
import request from '../../utils/request';
import STATUS from '../../utils/statusCodes';

function JobApplicationCard(props) {
    let job = props.job;
    const [isApplied, setIsApplied] = useState(false);
    const [err, setErr] = useState('');

    useEffect(() => {
        setErr('');
    },[isApplied])
    async function applyToJob(e) {
        let reqBody = {jobId:job.jobId, userId: props.userId};
        let response = await request('/job/apply', 'POST', reqBody);
        let status = response.status;
        response = await response.json();
        if(status !== STATUS.SUCCESS || status == STATUS.SERVER_ERROR) {
            let err = response.errs[0].msg;
            setErr(err);
        }
        else {
            setIsApplied(true);
        }
    }

    return (
        <div className="card">
            <div className="jobInfo">
                <div className="card-header d-flex justify-content-between">
                    <div>{job.title}</div>
                    <div>{job.postedOn}</div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{job.companyName}</h5>
                    <p className="card-text">{job.description}</p>
                    {job.requiredSkills ? <div className="skills d-flex flex-wrap">
                        {
                            job.requiredSkills.map(skill => <div key={skill.name}>{skill.name}</div>)
                        }
                    </div>:null}
                    {err?<p className="errClass">{err}</p>:null}
                    {props.renderForAllJob ? <button type="button" className={`btn ${isApplied ? "btn-success":"btn-primary"}`} disabled={isApplied} onClick={applyToJob}>{isApplied ? "Applied":"Apply"}</button>: 
                    <div className="appliedTxt">Applied</div>}
                </div>
            </div>
    </div>
    )
}

export default JobApplicationCard;