import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user, profile, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/login');
                return;
            }

            // Check for admin role
            // Note: Make sure your profiles table has a 'role' column setup in Supabase
            if (profile?.role !== 'admin') {
                navigate('/dashboard'); // or redirect to a 403 page
            }
        }
    }, [user, profile, loading, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
                <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-4xl animate-spin text-[#d41132]">progress_activity</span>
                    <p>Verificando permissões...</p>
                </div>
            </div>
        );
    }

    // If user is logged in and is admin, render children
    // We use specific check again to avoid flash of content
    if (user && profile?.role === 'admin') {
        return <>{children}</>;
    }

    return null; // Should have redirected by now
};

export default AdminRoute;
