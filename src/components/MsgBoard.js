import {useList} from 'react-firebase-hooks/database';
import {useCallback} from 'react';
import {database, getCurrentUser} from '../firebaseFunc.js';

const MsgBoard = (props) =>{
    const [snapshots] = useList(database.ref('/'+props.volunId).orderByChild('time'));
    const setRef = useCallback(node =>{
        if (node) node.scrollIntoView({smooth: true});
    }, []);

    const getNormalizeTimeString = (millisec) =>{
        let datetime = new Date(millisec);
        let hours = datetime.getHours();
        let mins = datetime.getMinutes();
        return `${hours}:${mins}`;
    };

    return (
        <div className="chat-container">
            {getCurrentUser() && snapshots && snapshots.map((v, index) => {
                const lastMessage = (snapshots.length-1 == index);
                return (
                <div ref={lastMessage?setRef:null} key={v.key} className="msg-container">
                    <div className={v.val().uid == getCurrentUser().uid?"msg-main-text my-msg":"msg-main-text opposite-msg"}>
                        {v.val().msg}    
                    </div>
                    <div className={v.val().uid == getCurrentUser().uid?"msg-lower-text my-msg":"msg-lower-text opposite-msg"}>
                        {getNormalizeTimeString(v.val().time)}
                    </div>
                </div>);
            })}
        </div>
    );
};

export default MsgBoard;