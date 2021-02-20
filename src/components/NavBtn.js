import { useEffect } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebaseFunc.js';

const NavBtn = (props) =>{

    const [user, loading] = useAuthState(auth);
    const BLOCK = {display: 'block'};
    const NONE = {display: 'none'};

    useEffect(() =>{
        
    });

    return (
        <li><a className={props.classList} href={props.href} data-target={props.dataTarget} onClick={props.onClick} style={(props.type=="loggedIn"?(!loading && user?BLOCK:NONE):(!loading && !user?BLOCK:NONE))}>{props.innerHtml}</a></li>
    );
};

export default NavBtn;