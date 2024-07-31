// src/components/Customer/CustomerDashboard.tsx
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './CustomerDashboard.css';

const CustomerDashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <div className="customer-dashboard">
            <h2>Welcome, {user?.name}</h2>
            <p>Email: {user?.email}</p>
        </div>
    );
};

export default CustomerDashboard;
