import { addClientQueue, LogOut, removeClientFromRoom, removeChatRoom, sendMessage, auth, isAssignedRoom, getCurrentUser} from '../firebaseFunc';

const FloatBtn = () =>{

    const chatModalClose = async () =>{
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

    function openChatModal(){
        var instance = window.M.Modal.init(document.getElementById('modalChat'), {dismissible:true, onCloseEnd:chatModalClose});
        instance.open();
        if (!getCurrentUser()) addClientQueue();
    }

    return (
        <div className="fixed-action-btn">
            <a className="btn-floating btn-large red waves-effect waves-light modal-trigger" data-target="modalChat" onClick={openChatModal}>
                <i className="large material-icons">add</i>
            </a>
        </div>
    );
}

export default FloatBtn;