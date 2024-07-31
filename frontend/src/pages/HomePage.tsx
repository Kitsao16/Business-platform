import * as React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <h1>Welcome to the Business Platform</h1>
            <p>Your one-stop solution for business management</p>
            <Link to="/profile">Go to Profile</Link>
        </div>
    );
};

export default HomePage;
