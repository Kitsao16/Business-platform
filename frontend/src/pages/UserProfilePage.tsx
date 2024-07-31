import * as React from 'react';
import UserProfile from '../components/Auth/UserProfile';
import './UserProfilePage.css';

const UserProfilePage: React.FC = () => {
    return (
        <div className="user-profile-page">
            <UserProfile />
        </div>
    );
};

export default UserProfilePage;
