import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center px-6">
                <div className="rounded-full border border-cyan-300/30 bg-slate-900/80 px-6 py-3 text-sm text-cyan-100 shadow-lg shadow-cyan-950/30">
                    Loading workspace...
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
