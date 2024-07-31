// frontend/src/hooks/useForm.ts
import { useState } from 'react';

export const useForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password: string): boolean => {
        return password.length >= 6;
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        setLoading,
        error,
        setError,
        validateEmail,
        validatePassword,
    };
};