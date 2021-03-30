import {useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, sendMessage} from '../firebaseFunc.js';
import ClientChat from './ClientChat';
import EmojiPicker from './EmojiPicker.js';
import LoadBar from './LoadBar';
import VolunChat from './VolunChat';

const ChatModal = () =>{

    const [msg, setMsg] = useState('');
    const [typing, setTypingStat] = useState(false);
    const [user] = useAuthState(auth);

    function toggleEmojiPicker(){
        document.querySelector('.emoji-picker-container').classList.toggle('opened');
    }

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
            <div className="modal-footer container row">
                <form onSubmit={submitMessage}>
                    <button className="message-btn transparent z-depth=0 col s1" type="button" name="emojiBtn" onClick={toggleEmojiPicker}><i className="material-icons indigo-text text-darken-4 right">tag_faces</i></button>
                    <input className="browser-default message-input light-blue lighten-3 col s8" placeholder="New message" id="msgText" type="text" value={msg} onChange={changeMessage}/>
                    <button className="message-btn transparent z-depth-0 col s1" type="submit" name="submitMsg"><i className="material-icons indigo-text text-darken-4 left">send</i></button>
                </form>             
            </div>
            {user && <EmojiPicker targetId={"msgText"}/>}
        </div>
    );
    
}

export default ChatModal;
