import React from 'react';
import UserInfo from '../components/users/UserInfo';

const UserPage = () => {
    return (
        <div className="container">
            <h2>My Profile</h2>
            <UserInfo />
        </div>
    );
}

export default UserPage;