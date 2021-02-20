import {useAuthState} from 'react-firebase-hooks/auth';
import { addClientQueue, auth} from '../firebaseFunc';

const FloatBtn = () =>{

    const [user] = useAuthState(auth);

    function openChatModal(){
        var instance = window.M.Modal.init(document.getElementById('modalChat'));
        instance.open();
        if (!user) addClientQueue();
    }

    return (
        <div className="fixed-action-btn">
            <a className="btn-floating btn-large red waves-effect waves-light modal-trigger" data-target="modalChat" onClick={openChatModal}>
                <i className="large material-icons">add</i>
            </a>
        </div>
    );
}

export default FloatBtn;