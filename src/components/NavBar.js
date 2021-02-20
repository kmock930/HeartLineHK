import {loginStatus, LogOut} from "../firebaseFunc.js";
import NavBtn from "./NavBtn";

const NavBar  = () =>{

    function openLoginModal(){
        var instance = window.M.Modal.init(document.getElementById('modalLogin'));
        instance.open();
    }

    return (
    <nav>
        <div className="nav-wrapper">
        <a href="#" className="brand-logo">Logo</a>
        <ul id="nav-mobile" className="right">
            <NavBtn type="loggedOut" classList="modal-trigger" href="#" dataTarget="modalLogin" onClick={openLoginModal} innerHtml="Login"/>
            <NavBtn type="loggedIn" href="#" onClick={LogOut} innerHtml="Logout"/>
        </ul>
      </div>
    </nav>
    );
}

export default NavBar;

/*
<li><a className="modal-trigger loggedOut" href="#" data-target="modalLogin" onClick={openLoginModal} >Login</a></li>
*/