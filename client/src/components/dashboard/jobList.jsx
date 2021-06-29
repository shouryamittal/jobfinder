import React from 'react';


function JobList(props) {
    let jobs = props.jobs;

    return (
        <div className="jobList row">
            {
                (jobs || []).map(job => 
                    <div key={job.id} className="col-xs-12 col-md-6">
                        {props.render(job)}
                    </div>)
            }
        </div>
    )
}

export default JobList;