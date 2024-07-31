import * as React from 'react';
import CustomerDashboard from '../components/Customer/CustomerDashboard';

const CustomerDashboardPage: React.FC = () => {
    return (
        <div className="customer-dashboard-page">
            <h2>Customer Dashboard Page</h2>
            <CustomerDashboard />
        </div>
    );
};

export default CustomerDashboardPage;
