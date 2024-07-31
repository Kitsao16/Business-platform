// src/components/Business/BusinessDashboard.tsx

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { getAllBusinesses } from '../../services/apiService';
import { setBusinesses } from '../../store/businessSlice';
import { useNavigate } from 'react-router-dom';
import './BusinessDashboard.css';

const BusinessDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const businesses = useSelector((state: RootState) => state.business.businesses);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchBusinesses = async () => {
            setLoading(true);
            setError('');
            try {
                const fetchedBusinesses = await getAllBusinesses();
                dispatch(setBusinesses(fetchedBusinesses));
            } catch (error) {
                setError('Failed to fetch businesses');
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses().catch(err => {
            console.error('Error fetching businesses:', err);
            setError('Failed to fetch businesses');
        });
    }, [dispatch]);

    return (
        <div className="business-dashboard">
            <h2>Your Businesses</h2>
            <button onClick={() => navigate('/create-business')}>Create New Business</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <ul>
                {businesses.map(business => (
                    <li key={business.id}>
                        <span>{business.name}</span>
                        <button onClick={() => navigate(`/business/${business.id}`)}>View Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusinessDashboard;