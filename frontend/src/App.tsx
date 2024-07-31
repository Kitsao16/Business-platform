import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import BusinessDashboard from './components/Business/BusinessDashboard';
import BusinessEdit from './components/Business/BusinessEdit';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { lazy, Suspense } from 'react';
import useSessionManagement from './hooks/useSessionManagement';

const Logout = lazy(() => import('./components/Auth/Logout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const BusinessProfile = lazy(() => import('./components/Business/BusinessProfile'));
const CreateBusiness = lazy(() => import('./components/Business/CreateBusiness'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const AdminPage = lazy(() => import('./components/Auth/AdminPage'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));

const App: React.FC = () => {
    useSessionManagement(); // Integrate session management

    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Navbar />
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/business/:id" element={<BusinessProfile />} />
                        <Route path="/business-dashboard" element={<BusinessDashboard />} />
                        <Route path="/business/edit/:id" element={<BusinessEdit />} />
                        <Route path="/create-business" element={
                            <ProtectedRoute>
                                <CreateBusiness />
                            </ProtectedRoute>
                        } />
                        <Route path="/user-profile" element={
                            <ProtectedRoute>
                                <UserProfilePage />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin" element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/unauthorized" element={<UnauthorizedPage />} />
                        <Route path="/logout" element={
                            <ProtectedRoute>
                                <Logout />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </Suspense>
                <Footer />
            </Router>
        </Provider>
    );
};

export default App;