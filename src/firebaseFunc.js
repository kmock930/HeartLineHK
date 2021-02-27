import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBh6rKCpApWA1Txf2F_Isb3WaMAEK0cv68",
    authDomain: "livechatprototype.firebaseapp.com",
    databaseURL: "https://livechatprototype-default-rtdb.firebaseio.com",
    projectId: "livechatprototype",
    storageBucket: "livechatprototype.appspot.com",
    messagingSenderId: "912938254006",
    appId: "1:912938254006:web:2a643e21a96a389caeb017",
    measurementId: "G-8N03NYX69F"
  };
  
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

//Database refs
const clientQueue = '/clientQueue';
const roomAssigned = '/roomAssigned';
const currClientId = '/currClientId';

const addClientQueue = async () =>{
    try{
        let cred = await LogIn(true);
        console.log("UID:"+cred.user.uid);
        let queueEnt = {
            'status':'inQueue',
            'time':Date.now()
        };
        console.log(queueEnt);
        await database.ref(clientQueue+'/'+cred.user.uid).set(queueEnt);
    }catch(error){
        console.log(error);
    }
};

const isInClientQueue = async () =>{
    try{
        if (auth.currentUser && auth.currentUser.isAnonymous){
            let snapshot = await database.ref(clientQueue+'/'+auth.currentUser.uid).once('value');
            if (snapshot.val()) return 1;
            else return 0;
        }else throw "ERROR: Not logged in or Not a client!";
    }catch(error){
        console.log(error);
        return -1;
    }
}

const isAssignedRoom = async () =>{
    try{
        if (auth.currentUser && auth.currentUser.isAnonymous){
            let snapshot = await database.ref(roomAssigned+'/'+auth.currentUser.uid).once('value');
            if (snapshot.val() && snapshot.val().status != "volunLeft") return 1;
            else return 0;
        }else throw "ERROR: Not logged in or Not a client!";
    }catch(error){
        console.log(error);
        return -1;
    }
}

const dequeueClientQueue = async () =>{
    try{
        if (isInClientQueue()){
            await database.ref(clientQueue+'/'+auth.currentUser.uid).remove();
            console.log('removed user '+auth.currentUser.uid+' from queue.');
        }else throw "ERROR: Not in Client Queue!";
    }catch (error){ 
        console.log(error);
    }
}

const addClientToRoom = async (volunId, clientId) =>{
    try{
        if (auth.currentUser.uid == volunId && !auth.currentUser.isAnonymous){
            let snapshot = await database.ref(clientQueue+'/'+clientId).once('value');
            if (snapshot.val()){
                await database.ref(clientQueue+'/'+clientId).remove();
                await database.ref(roomAssigned+'/'+clientId).set({
                    'status':volunId,
                    'time':Date.now()
                });
                await database.ref(currClientId+'/'+volunId).set(clientId);
                await database.ref('/'+volunId).push().set({
                    'uid':volunId,
                    'time':Date.now(),
                    'msg':"Volunteer has joined the chat."
                });
                return 1;
            }else throw "ERROR: Not in Client Queue!";
        }else throw "ERROR: Current UID is not the same as the given Volunteer ID!";
    }catch(error){
        console.log(error);
        return -1;
    }
}

const removeClientFromRoom = async(clientId) =>{
    try{
        if (auth.currentUser.uid == clientId && auth.currentUser.isAnonymous){
            if (isAssignedRoom()){
                let snapshot = await database.ref(roomAssigned+'/'+clientId).once('value');
                if (snapshot.val().status != 'volunLeft') await database.ref(currClientId+'/'+snapshot.val().status).set('clientLeft');
                await database.ref(roomAssigned+'/'+clientId).remove();
                return 1;
            }else throw "ERROR: No assigned room!";
        }else throw "ERROR: Current UID is not the same as the given Client ID!";
    }catch(error){
        console.log(error);
        return -1;
    }
}

const removeChatRoom = async (volunId) =>{
    try{
        if (auth.currentUser.uid == volunId && !auth.currentUser.isAnonymous){
            let snapshot = await database.ref(currClientId+'/'+volunId).once('value');
            if (snapshot.val() && snapshot.val() != 'clientLeft'){
                let assignedSnapshot = await database.ref(roomAssigned+'/'+snapshot.val()).once('value');
                if (assignedSnapshot.val()){
                    await database.ref(roomAssigned+'/'+snapshot.val()).set({
                        'status':'volunLeft',
                        'time':Date.now()
                    });
                }
            }
            await database.ref(currClientId+'/'+volunId).remove();
            await database.ref('/'+volunId).remove();
            return 1;
        }else throw "ERROR: Current UID is not the same as the given Volunteer ID!"
    }catch(error){
        console.log(error);
        return -1;
    }
}

const sendMessage = async (msgObj) =>{
    try{
        if (msgObj){
            let volunId = null;
            if (auth.currentUser.isAnonymous){
                let userRoom = await database.ref(roomAssigned+'/'+auth.currentUser.uid).once('value');
                if (userRoom) volunId = userRoom.val().status;
            }else volunId = auth.currentUser.uid;
            if (volunId && msgObj.uid && msgObj.time && msgObj.msg && msgObj.uid == auth.currentUser.uid && msgObj.time<=Date.now()) database.ref('/'+volunId).push().set(msgObj);
            else console.log('invalid msgObj or invalid volunId');
        }else console.log('msgObj is null');
    }catch(error){
        console.log(error);
    }
}

const LogIn = async (anonymous=false, email=null, password=null) =>{
    try{
        let cred = null;
        await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        if (!anonymous) cred = await auth.signInWithEmailAndPassword(email, password);
        else cred = await auth.signInAnonymously();
        return cred;
    }catch(error){
        console.log(error);
        return error;
    }
};

const LogOut = async () =>{
    try{
        if (auth.currentUser.isAnonymous){
            await dequeueClientQueue();
            await auth.currentUser.delete();
        }else await auth.signOut();
    }catch(error){
        console.error(error);
    }
};

const getCurrentUser = () =>{
    return auth.currentUser;
}

const setClientId = (clientId) =>{

}

export {auth, database, roomAssigned, clientQueue, currClientId, getCurrentUser, LogIn, LogOut, addClientQueue, addClientToRoom, removeChatRoom, removeClientFromRoom, isAssignedRoom, sendMessage};


