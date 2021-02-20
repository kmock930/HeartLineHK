import {useList} from 'react-firebase-hooks/database';
import {useAuthState} from 'react-firebase-hooks/auth';
import {database, auth} from '../firebaseFunc.js';
import {useState, useEffect} from 'react';

const MsgBoard = (props) =>{
    const [snapshots, loading, error] = useList(database.ref('/'+props.volun_id).orderByChild('time'));
    const [user] = useAuthState(auth); 

    return (
        <div>
            {snapshots && snapshots.map(v => (
                <p key={v.key}>{v.val().uid == user.uid?"Me":(user.isAnonymous?"Volunteer":"Client")}: {v.val().msg}</p>
            ))}
        </div>
    );
};

export default MsgBoard;