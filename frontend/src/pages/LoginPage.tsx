import * as React from 'react';
import Login from '../components/Auth/Login';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    return (
        <div className="login-page">
            <Login />
        </div>
    );
};

export default LoginPage;
