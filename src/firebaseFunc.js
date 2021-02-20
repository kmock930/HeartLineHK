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
const roomAssigned = '/roomAssigned';

const addClientQueue = async () =>{
    try{
        let cred = await auth.signInAnonymously();
        console.log("UID:"+cred.user.uid);
        let queueEnt = {
            'status':'inQueue',
            'time':Date.now()
        };
        console.log(queueEnt);
        await database.ref(roomAssigned+'/'+cred.user.uid).set(queueEnt);
    }catch(error){
        console.log(error);
    }
};

const isInClientQueue = async () =>{
    try{
        let snapshot = await database.ref(roomAssigned+'/'+auth.currentUser.uid).once('value');
        if (snapshot.val()) return 1;
        else return 0;
    }catch(error){
        console.log(error);
        return -1;
    }
}

const dequeueClientQueue = async () =>{
    try{
        await database.ref(roomAssigned+'/'+auth.currentUser.uid).remove();
        console.log('removed user '+auth.currentUser.uid+' from queue.');
    }catch (error){ 
        console.log(error);
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
            console.log('volunId: '+volunId);
            if (volunId && msgObj.uid && msgObj.time && msgObj.msg && msgObj.uid == auth.currentUser.uid && msgObj.time<=Date.now()) database.ref('/'+volunId).push().set(msgObj);
            else console.log('invalid msgObj or invalid volunId');
        }else console.log('msgObj is null');
    }catch(error){
        console.log(error);
    }
}

const LogIn = async (email, password) =>{
    try{
        var cred = await auth.signInWithEmailAndPassword(email, password);
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


export {auth, database, roomAssigned, LogIn, LogOut, addClientQueue, sendMessage};


