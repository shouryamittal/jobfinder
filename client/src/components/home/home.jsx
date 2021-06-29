import React, {useState} from 'react';
import Signup from '../singup/singup';
import Login from '../login/login';
import '../../styles/home.css';

function Home() {
    let [isSignupFormSelected, setSignUpForm] = useState(true);

    function toggleFormView(type){
        let isSignupForm = type === "signup" ? true : false;
        setSignUpForm(isSignupForm);
    }

    return(
        <div className="home">
            <div className="container">
                <div className="row homePageRow">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 textSection d-flex flex-column justify-content-center">
                        <h1 className="mainText">Find your next dream Job</h1>
                        <p>Job Finder enables you to find your next dream job.</p>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 formSection">
                        <div className="formToggler d-flex align-items-center">
                            <div className={`toggleOption ${isSignupFormSelected ? "selected":""}`} onClick={() => {toggleFormView("signup")}}>Signup</div>
                            <div className={`toggleOption ${!isSignupFormSelected ? "selected":""}`} onClick={() => {toggleFormView("login")}}>Login</div>
                        </div>
                        {isSignupFormSelected ? <Signup />:<Login />}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;