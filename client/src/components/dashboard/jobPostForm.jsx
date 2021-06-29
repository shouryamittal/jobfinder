import React, {useEffect, useState} from 'react';
import validateForm from '../../utils/formValidator';
import request from '../../utils/request';
import useForm from '../../hooks/useForm';
import STATUS from '../../utils/statusCodes';

function JobPostForm(props) {
    let [fields, updateFields, resetFields] = useForm({title:'', description:'', companyName:'', location:''});
    let [errs, setErrs] = useState({});
    let [skills, setSkills] = useState([]);
    let [selectedSkills, setSelectedSkills] = useState([]);
    useEffect(() => {
        (async () => {
            let res = await request(`/misc/skills`, 'GET');
            let status = res.status;
            res = await res.json();
            if(status === STATUS.SUCCESS) {
                setSkills(res.data);
            }
        })();
    },[]);

    async function handleSubmit(e) {
        e.preventDefault();
        let errors = validateForm(fields);
        if(Object.keys(errors).length > 0) {
            setErrs(errors);
        }
        else {
            const reqBody = {
                title: fields.title, description: fields.description, companyName: fields.companyName, location: fields.companyName, postedBy: props.userId, skillIds: selectedSkills
            }

            let response = await request('/job', 'POST',reqBody);
            let status = response.status;
            response = await response.json();
            if(status !== STATUS.SUCCESS) {
                let error = {jobPostErr: response.errs[0].msg};
                setErrs(error);
            }
            else {
                props.setJobCount(props.jobAddCount + 1);
                resetFields();
                setSelectedSkills([])
            }
        }
    }

    function addSkill(e) {
        let id = e.target.getAttribute("data-id");
        let ids = [...selectedSkills];
        if(selectedSkills.includes(id)){
            ids = ids.filter(sid => sid !== id);
            e.target.classList.remove('selectedSkill');
        }
        else {
            ids.push(id);
            e.target.classList.add('selectedSkill');
        }
        setSelectedSkills(ids);
    }

    return(
        <div className="jobPostFormContainer">
            <form name="jobPostForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control"  name="title" value={fields["title"]} onChange={updateFields} placeholder="Job Title"/>
                    <div className="errClass">{errs["title"]}</div>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="description" value={fields["description"]} onChange={updateFields} placeholder="Description"/>
                    <div className="errClass">{errs["description"]}</div>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="companyName" value={fields["companyName"]} onChange={updateFields} placeholder="Company Name"/>
                    <div className="errClass">{errs["companyName"]}</div>
                </div>

                {
                    skills.length > 0 ? 
                    <div className="skillsContainer">
                        {
                            skills.map(skill => <div data-id={skill.id} className="skill" onClick={addSkill}>{skill.name}</div>)
                        }
                    </div> :null
                }
                <div className="form-group">
                    <input type="text" className="form-control" name="location" value={fields["location"]} onChange={updateFields} placeholder="Location"/>
                    <div className="errClass">{errs["location"]}</div>
                </div>
                <div className="actionBtnContainer">
                    <button type="submit" className="btn-primary actionBtn">Post Job</button>
                </div>
            </form>
        </div>
    )
}

export default JobPostForm;