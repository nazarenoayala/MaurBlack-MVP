import './loader.css';

const Loader = ({ message = 'LOADING' }) => {
    return (
        <div className="loader-wrapper">
            <div className="loader-content">
                <div className="loader-bar">
                    <div className="loader-fill" />
                </div>
                <span className="loader-text">{message}</span>
            </div>
        </div>
    );
};

export default Loader;