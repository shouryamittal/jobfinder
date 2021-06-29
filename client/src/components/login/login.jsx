import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import useForm from '../../hooks/useForm';
import validateForm from '../../utils/formValidator';
import request from '../../utils/request';
import STATUS from '../../utils/statusCodes';
import {AuthContext} from '../../authContext';

function Login() {
    let [fields, updateFields] = useForm({email:'', password:'', userType:'0'});
    let [errs, setErrs] = useState({});
    const {setAuthValue} = useContext(AuthContext);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        let errors = validateForm(fields);
        if(Object.keys(errors).length > 0) {
            setErrs(errors);
        }
        else {
            const reqBody = {
                email: fields.email,
                password: fields.password,
                userType: fields.userType
            }
            let response = await request('/user/login', 'POST', reqBody);
            let status = response.status;
            response = await response.json();
            if(status !== STATUS.SUCCESS) {
                let error = {singupError: response.errs[0].msg};
                setErrs(error);
            }
            else {
                let token = response.data.token;
                setAuthValue(token);
                let path = fields.userType === '0' ? '/recruiterDashboard':'/candidateDashbaord'
                history.push(path);
            }
        }
    }

    return(
        <div className="login">
            <div className="textContent">{errs.singupError ? <div className="errClass">{errs.singupError}</div>: "Welcome back ! Login to your dashboard"}</div>
            <form name="loginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" name="email" value={fields["email"]} onChange={updateFields} className="form-control" maxLength="100" placeholder="E-mail"/>
                    <div className="errClass">{errs["email"]}</div>
                </div>
                <div className="form-group">
                    <input type="password" name="password" value={fields["password"]} onChange={updateFields} className="form-control" maxLength="8" placeholder="Password" />
                    <div className="errClass">{errs["password"]}</div>
                </div>
                <div className="registrationOptions d-flex justify-content-evenly">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="userType" value={'0'} checked={fields["userType"] === '0'} onChange={updateFields}/>
                        <label className="form-check-label" >
                            I'm a Recruiter
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="userType" value={'1'} checked={fields["userType"] === '1'} onChange={updateFields}/>
                        <label className="form-check-label" >
                            I'm a Candidate
                        </label>
                    </div>
                </div>
                <div className="actionBtnContainer">
                    <button type="submit" className="btn-primary actionBtn">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;