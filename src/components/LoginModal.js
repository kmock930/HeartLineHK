import {LogIn} from "../firebaseFunc.js";
import {useState} from 'react';

const LoginModal = () =>{

    const [loginError, setLoginError] = useState(''); 

    async function submitLogin(event){
        event.preventDefault();
        console.log("submit pressed");
        let email = event.target['loginEmail'].value;
        let password = event.target['loginPassword'].value;
        if (email != "" && password != ""){
            console.log(email+" "+password);
            event.target.reset();
            var ret = await LogIn(email, password);
            if (ret.user){
                setLoginError('');
                window.M.Modal.getInstance(document.getElementById('modalLogin')).close();
                console.log("Modal closed because logged in");
            }else{
                setLoginError(ret['message']);
                console.log("Error occurs.");
            }
        }else{
            setLoginError("Login details not completed");
            console.log("Login details are not completed");
        }
    }

    return (
        <div id="modalLogin" className="modal">
            <form id="loginForm" onSubmit={submitLogin}>
            <div className="modal-content">
                <h4>Volunteer Sign In</h4><br/>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="email" id="loginEmail" className="validate"/>
                        <label htmlFor="loginEmail">Email</label>
                        <span className="helper-text" data-wrror="Incorrect Email"/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="password" id="loginPassword" />
                        <label htmlFor="loginPassword">Password</label>
                    </div>
                </div>
                <div id="loginError">
                    {loginError}
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-flat waves-effect waves-light z-depth-0" type="submit" name="loginButton">Login
                </button>
                <button className="modal-close btn-flat waves-effect waves-light z-depth-0" type="reset" name="closeButton">Close
                </button>
            </div>
            </form>
        </div>
    );
    
}

export default LoginModal;