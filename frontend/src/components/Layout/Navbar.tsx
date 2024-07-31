import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <button className="hamburger" onClick={toggleMenu} aria-expanded={isOpen}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/login" onClick={toggleMenu}>Login</Link>
                <Link to="/register" onClick={toggleMenu}>Register</Link>
                <Link to="/profile" onClick={toggleMenu}>Profile</Link>
                {user?.accountType === 'admin' && (
                    <>
                        <Link to="/admin" onClick={toggleMenu}>Admin</Link>
                        <Link to="/create-business" onClick={toggleMenu}>Create Business</Link>
                    </>
                )}
                {user && (
                    <Link to={`/business/${user.id}`} onClick={toggleMenu}>My Business</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
