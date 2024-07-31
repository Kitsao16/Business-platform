import * as React from 'react';
import Register from '../components/Auth/Register';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
    return (
        <div className="register-page">
            <Register />
        </div>
    );
};

export default RegisterPage;
