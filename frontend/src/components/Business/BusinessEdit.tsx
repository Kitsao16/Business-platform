import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateBusiness } from '../../services/apiService';
import { setCurrentBusiness } from '../../store/businessSlice';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BusinessEdit.css';

const BusinessEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const business = useSelector((state: RootState) => state.business.currentBusiness);
    const [name, setName] = useState<string>(business?.name || '');
    const [description, setDescription] = useState<string>(business?.description || '');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (business && business.id !== id) {
            setName(business.name);
            setDescription(business.description);
        }
    }, [business, id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const updatedBusiness = await updateBusiness(id!, { name, description, owner: business?.owner });
            dispatch(setCurrentBusiness(updatedBusiness));
            navigate(`/business/${id}`);
        } catch (error) {
            setError('Failed to update business');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="business-edit">
            <h2>Edit Business</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Business'}
                </button>
            </form>
        </div>
    );
};

export default BusinessEdit;