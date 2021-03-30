import {database, clientQueue, currClientId, addClientToRoom, getCurrentUser} from '../firebaseFunc.js';
import {useList, useObject} from 'react-firebase-hooks/database';
import {useEffect, useState} from 'react';
import MsgBoard from './MsgBoard';

const VolunChat = () =>{

    const [snapshots, loading, error] = useList(database.ref(clientQueue));
    const [value] = useObject(database.ref(currClientId+'/'+getCurrentUser().uid));
    const [queueCount, setQueueCount] = useState(0);
    const [nextClient, setNextClient] = useState({});
    const [acceptedClientId, setAcceptedClientId] = useState(null);
    const [accepted , setAcceptedState] = useState(false);

    useEffect(() =>{
        if (value && value.val() != acceptedClientId){
            setAcceptedClientId(value.val());
            setAcceptedState(false);
        }
        if (snapshots){
            let tmpCount=0;
            let tmpClient = {
                'time':0,
                'clientId':null
            };
            snapshots.forEach(v =>{
                if (tmpClient.time == 0 || (v.val().time >0 && v.val().time < tmpClient.time)){
                    tmpClient.time = v.val().time;
                    tmpClient.clientId = v.key;
                }
                tmpCount += 1;
            });
            setQueueCount(tmpCount);
            setNextClient(tmpClient);
        }
    }, [snapshots, value]);

    const acceptClient = async () =>{
        let user = getCurrentUser();
        if (user){
            let ret = await addClientToRoom(user.uid, nextClient.clientId);
            if (ret == 1){
                setAcceptedClientId(nextClient.clientId);
                setAcceptedState(true);
            }
            else document.getElementById('ErrMsg').innerHTML = "Error occurs when trying to start chat with this client!";
        }else console.error("ERROR: Cannot accept client chat if not logged in!");
    }

    return (
        <div>
            {!accepted && <p>Queue Count: {queueCount}</p>}
            {loading && <h4>Loading</h4>}
            {error && <h4>Error</h4> && console.log(error)}
            {acceptedClientId == 'clientLeft' && <p>Last Client has ended the chat</p>}
            {!accepted && queueCount>0 && nextClient && 
            <div>
                <h4>Next Client is {nextClient.clientId}</h4>
                <button className="btn wave-effect waves-light" onClick={acceptClient}>Start Chat</button>
                <div id="ErrMsg"></div>
            </div>    
            }
            {accepted && <MsgBoard volunId={getCurrentUser().uid}/>}
        </div>
    );
}

export default VolunChat;