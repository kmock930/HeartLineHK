import {database, auth, roomAssigned} from '../firebaseFunc.js';
import {useList} from 'react-firebase-hooks/database';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useEffect, useState} from 'react';
import MsgBoard from './MsgBoard';

const VolunChat = () =>{

    const [snapshots, loading, error] = useList(database.ref(roomAssigned));
    const [user] = useAuthState(auth);
    const [queueCount, setQueueCount] = useState(0);
    const [nextClient, setNextClient] = useState({});
    const [accepted , setAcceptedState] = useState(false);

    useEffect(() =>{
        if (snapshots){
            let tmpCount=0;
            let tmpClient = {
                'time':0,
                'client_id':null
            };
            snapshots.forEach(v =>{
                if (tmpClient.time == 0 || (v.val().time >0 && v.val().time < tmpClient.time)){
                    tmpClient.time = v.val().time;
                    tmpClient.client_id = v.key;
                }
                tmpCount += 1;
            });
            setQueueCount(tmpCount);
            setNextClient(tmpClient);
        }
    }, [snapshots]);

    const acceptClient = () =>{
        database.ref(roomAssigned+'/'+nextClient.client_id).set({
            'status':user.uid,
            'time':-1
        });
        database.ref('/'+user.uid).push().set({
            'uid':user.uid,
            'time':Date.now(),
            'msg':"Volunteer has joined the chat."
        });
        setAcceptedState(true);
    }

    return (
        <div>
            <p>Queue Count: {queueCount}</p>
            {loading && <h4>Loading</h4>}
            {error && <h4>Error</h4> && console.log(error)}
            {!accepted && queueCount>0 && nextClient && 
            <div>
                <h4>Next Client is {nextClient.client_id}</h4>
                <button className="btn wave-effect waves-light" onClick={acceptClient}>Start Chat</button>
            </div>    
            }
            {accepted && <MsgBoard volun_id={user.uid}/>}
        </div>
    );
}

export default VolunChat;