import {useList} from 'react-firebase-hooks/database';
import {useAuthState} from 'react-firebase-hooks/auth';
import {database, auth, roomAssigned} from '../firebaseFunc.js';
import {useState, useEffect} from 'react';
import MsgBoard from './MsgBoard';

const ClientChat = () =>{

    const [user] = useAuthState(auth);
    const [snapshots, loading, error] = useList(database.ref(roomAssigned+'/'+user.uid));
    const [status, setStatus] = useState('inQueue');

    useEffect(()=>{
        if (snapshots) snapshots.forEach(v => {
            if (v.key == 'status') setStatus(v.val());
        });
    }, [snapshots]);


    return (
        <div>
            {loading && <h4>Loading</h4>}
            {error && <h4>Error</h4>}
            {user && status == 'inQueue' && <h4>In Queue</h4>}
            {user && status == 'volunLeft' && <h4>Volunteer ended the chat</h4>}
            {user && (status != 'inQueue' || status != 'volunLeft') && <MsgBoard volunId={status}/>}
        </div>

    );
}

export default ClientChat;