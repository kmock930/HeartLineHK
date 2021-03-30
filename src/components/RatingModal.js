const RatingModal = () =>{

    const starChecked = (e) =>{
        console.log(e.target.id);
        let stars = document.querySelectorAll(".star-radio");
        for (var i=0; i<stars.length; i++){
            if (stars[i].id <= e.target.id) stars[i].classList.add('selected');
            else stars[i].classList.remove('selected');
        }
    }
    
    return(
        <div id="modalRating" className="modal">
            <div className="modal-content">
                <div className="star-container">
                    <input className="star-radio" type="radio" name="star" id="star1" onClick={starChecked}/><label htmlFor="star1"><i className="material-icons">star_rate</i></label>
                    <input className="star-radio" type="radio" name="star" id="star2" onClick={starChecked}/><label htmlFor="star2"><i className="material-icons">star_rate</i></label>
                    <input className="star-radio" type="radio" name="star" id="star3" onClick={starChecked}/><label htmlFor="star3"><i className="material-icons">star_rate</i></label>
                    <input className="star-radio" type="radio" name="star" id="star4" onClick={starChecked}/><label htmlFor="star4"><i className="material-icons">star_rate</i></label>
                    <input className="star-radio" type="radio" name="star" id="star5" onClick={starChecked}/><label htmlFor="star5"><i className="material-icons">star_rate</i></label>
                </div>
                <textarea name="commentText" id="commentText" cols="30" rows="10"></textarea>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close btn-flat waves-effect waves-light">Submit</a>
                <a href="#!" className="modal-close btn-flat waves-effect waves-light">Close</a>
            </div>
        </div>
    );
};

export default RatingModal;