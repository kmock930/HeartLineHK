import {useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, sendMessage} from '../firebaseFunc.js';
import ClientChat from './ClientChat';
import LoadBar from './LoadBar';
import VolunChat from './VolunChat';

const ChatModal = () =>{

    const [msg, setMsg] = useState('');
    const [typing, setTypingStat] = useState(false);
    const [user] = useAuthState(auth);

    function changeMessage(event){
        setMsg(event.target.value);
        setTypingStat((event.target.value == ''?false:true));
    }

    function submitMessage(event){
        event.preventDefault();
        if (msg!=''){
            if (user){
                let newMsg = {
                    'uid':user.uid,
                    'msg':msg,
                    'time':Date.now()
                };
                sendMessage(newMsg);
            }else console.log("Not logged in");
            setMsg('');
            setTypingStat(false);
        }else console.log("Empty message");
    }

    return (
        <div id="modalChat" className="modal modal-fixed-footer overflow-hidden">
            <div className="modal-content">
                {user?(user.isAnonymous?<ClientChat/>:<VolunChat/>):<LoadBar/>}
            </div>
            <div className="modal-footer row">
                <form onSubmit={submitMessage}>
                    <div className="input-field col s8">
                        <i className="material-icons prefix">message</i>
                        <input placeholder="Input message" id="msgText" type="text" value={msg} onChange={changeMessage}/>
                    </div>
                    <button className="btn waves-effect waves-light col s2" type="submit" name="submitMsg">Send
                        <i className="material-icons right">send</i>
                    </button>
                </form>             
            </div>
        </div>
    );
    
}

export default ChatModal;
