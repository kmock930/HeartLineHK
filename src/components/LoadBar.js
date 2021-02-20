const LoadBar = () =>{
    return (
        <div className="loadBarWrapper">
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadBar;