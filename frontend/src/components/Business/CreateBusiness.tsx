import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addBusiness } from '../../store/businessSlice';
import './CreateBusiness.css';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { createBusiness } from '../../services/apiService';

interface Business {
    id?: number;
    name: string;
    description: string;
    owner: number;
    products: Product[];
}

interface Product {
    id?: number;
    name: string;
    price: number;
}

const CreateBusiness: React.FC = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<Business>();
    const { fields, append, remove } = useFieldArray({ control, name: 'products' });
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const onSubmit = async (data: Business) => {
        setLoading(true);
        setError('');
        setSuccess(false);

        if (!user?.id) {
            setError('User not found');
            setLoading(false);
            return;
        }

        if (data.products.some(product => product.price <= 0)) {
            setError('Product prices must be positive numbers');
            setLoading(false);
            return;
        }

        const newBusiness: Business = { ...data, owner: user.id };

        try {
            const response = await createBusiness(newBusiness);
            dispatch(addBusiness(response));
            setSuccess(true);
        } catch (error) {
            setError('Error creating business');
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = () => {
        append({ id: Date.now(), name: '', price: 0 });
    };

    return (
        <div className="create-business">
            <h2>Create Business</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Business created successfully!</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                    />
                    {errors.name && <p className="error-message">Name is required</p>}
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        {...register('description', { required: true })}
                    />
                    {errors.description && <p className="error-message">Description is required</p>}
                </div>
                <div className="form-group">
                    <label>Products and Services:</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="product-input">
                            <input
                                type="text"
                                placeholder="Product Name"
                                {...register(`products.${index}.name`, { required: true })}
                            />
                            {errors.products?.[index]?.name && <p className="error-message">Product name is required</p>}
                            <input
                                type="number"
                                placeholder="Price"
                                {...register(`products.${index}.price`, { required: true, min: 1 })}
                            />
                            {errors.products?.[index]?.price && <p className="error-message">Price must be a positive number</p>}
                            <button type="button" onClick={() => remove(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddProduct}>
                        Add Product or Service
                    </button>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Business'}
                </button>
            </form>
        </div>
    );
};

export default CreateBusiness;
