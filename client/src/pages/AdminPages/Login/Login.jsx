import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../../services/auth.service';
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await loginAdmin(email, password);
            console.log('Response from backend:', data); 
            //Guardo token al LocalStorage para futura request de admin
            localStorage.setItem('adminToken', data.token);
            navigate('/admin/dashboard');
        } catch (error) {
            setError('Invalid email or password');
        }finally {
            setLoading(false);
        }
    };

  return (
    <div className="login-wrapper">
            <div className="login-box">
                <h1 className="login-title">MAUR BLACK</h1>
                <p className="login-subtitle">Admin Panel</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@email.com"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
  )
}

export default Login;