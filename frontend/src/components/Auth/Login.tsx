import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { login as loginService } from '../../services/authService';
import './Login.css';

const Login: React.FC = () => {
    const { email, setEmail, password, setPassword, loading, setLoading, error, setError, validateEmail, validatePassword } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email) || !validatePassword(password)) {
            setError('Invalid email or password');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const user = await loginService(email, password, navigate);
            dispatch(setUser(user));
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={!!error && !validateEmail(email)}
                        aria-describedby="email-error"
                    />
                    {!!error && !validateEmail(email) && (
                        <span id="email-error" className="error">
                            Invalid email format
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-invalid={!!error && !validatePassword(password)}
                        aria-describedby="password-error"
                    />
                    {!!error && !validatePassword(password) && (
                        <span id="password-error" className="error">
                            Password must be at least 6 characters
                        </span>
                    )}
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;