// frontend/src/components/Auth/Register.tsx
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { register as registerService } from '../../services/authService';
import './Register.css';
import { useState } from 'react';

const Register: React.FC = () => {
    const { email, setEmail, password, setPassword, loading, setLoading, error, setError, validateEmail, validatePassword } = useForm();
    const [name, setName] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
            setError('Invalid input');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const data = await registerService(name, email, password, navigate);
            dispatch(setUser({ id: data.user.id, name: data.user.name, email: data.user.email, accountType: 'customer' }));
        } catch (error) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        aria-invalid={!!error && password !== confirmPassword}
                        aria-describedby="confirm-password-error"
                    />
                    {!!error && password !== confirmPassword && (
                        <span id="confirm-password-error" className="error">
                            Passwords do not match
                        </span>
                    )}
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;