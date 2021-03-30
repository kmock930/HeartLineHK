import {getCurrentUser, isAssignedRoom, sendMessage, removeClientFromRoom, LogOut, removeChatRoom, addClientQueue} from './firebaseFunc';


const closeChatModal = async () =>{
    let user = getCurrentUser();
    if (user){
        if (user.isAnonymous){
            let ret = await isAssignedRoom();
            if (ret == 1){
                await sendMessage({
                    'uid':user.uid,
                    'time':Date.now(),
                    'msg':"Client has left."
                });
            }
            await removeClientFromRoom(user.uid);
            await LogOut();
        }else await removeChatRoom(user.uid);
    }else console.log("Not logged in");
}

const openChatModal = () =>{
    var instance = window.M.Modal.init(document.getElementById('modalChat'), {dismissible:true, onCloseEnd:closeChatModal});
    instance.open();
    if (!getCurrentUser()) addClientQueue();
}

export {closeChatModal, openChatModal};

