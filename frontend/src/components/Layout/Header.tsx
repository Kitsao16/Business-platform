import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './Header.css';

const Header: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Business Platform</Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/business-dashboard">My Business</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
