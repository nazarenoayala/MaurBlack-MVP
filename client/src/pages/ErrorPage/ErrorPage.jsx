import { useNavigate } from 'react-router-dom';
import './errorPage.css';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <main className="notfound-wrapper">
            <div className="notfound-cover" />
            <div className="notfound-content">
                <span className="notfound-code">404</span>
                <div className="notfound-divider" />
                <h1 className="notfound-title">PAGE NOT FOUND</h1>
                <p className="notfound-subtitle">THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST</p>
                <button
                    className="notfound-cta"
                    onClick={() => navigate('/')}
                >
                    BACK TO HOME
                </button>
            </div>
        </main>
    );
};

export default ErrorPage;