// src/components/Auth/ProtectedRoute.tsx

import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {useEffect, useState} from "react";

interface Props {
    children: React.ReactNode;
    requiredRole?: string;
    loginRedirect?: string;
    unauthorizedRedirect?: string;
}

const ProtectedRoute: React.FC<Props> = ({
                                             children,
                                             requiredRole,
                                             loginRedirect = "/login",
                                             unauthorizedRedirect = "/unauthorized"
                                         }) => {
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (isAuthenticated !== undefined) {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={loginRedirect} />;
    }

    if (requiredRole && user?.accountType !== requiredRole) {
        return <Navigate to={unauthorizedRedirect} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
