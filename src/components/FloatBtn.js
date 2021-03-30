import {openChatModal} from '../uiFunc';

const FloatBtn = () =>{

    return (
        <div className="fixed-action-btn">
            <a className="btn-floating btn-large red waves-effect waves-light modal-trigger" data-target="modalChat" onClick={openChatModal}>
                <i className="large material-icons">add</i>
            </a>
        </div>
    );
}

export default FloatBtn;