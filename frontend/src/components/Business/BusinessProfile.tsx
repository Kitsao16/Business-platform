import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCurrentBusiness } from '../../store/businessSlice';
import { getBusinessById } from '../../services/apiService';
import './BusinessProfile.css';
import { useEffect, useState } from "react";

const BusinessProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const business = useSelector((state: RootState) => state.business.currentBusiness);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchBusiness = async () => {
            setLoading(true);
            setError('');
            try {
                const fetchedBusiness = await getBusinessById(id!);
                dispatch(setCurrentBusiness(fetchedBusiness));
            } catch (error) {
                setError('Failed to fetch business');
            } finally {
                setLoading(false);
            }
        };

        fetchBusiness();
    }, [id, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!business) {
        return <div>No business found</div>;
    }

    return (
        <div className="business-profile">
            <h2>{business.name}</h2>
            <p>{business.description}</p>
        </div>
    );
};

export default BusinessProfile;