import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchUserPurchases, fetchUserById } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import PurchaseList from '../purchases/PurchaseList.jsx';
import ErrorMessage from '../common/ErrorMessage';

const UserInfo = () => {
    const { user, isLoggedIn, logout } = useAuth();
    // const [users, setUsers] = useState([]);
    const [ userData, setUserData ] = useState({});
    const [loading, setLoading] = useState(true);
    const [ userPurchases, setUserPurchases ] = useState([]);
    const [ error, setError ] = useState(null);

    useEffect( () =>{
        const fetchUser = async () => {
            try {
                if (isLoggedIn) {
                    // const usersRes = await fetchUsers(); // for admin only
                    // setUsers(usersRes.data); 
                    const userRes = await fetchUserById(user.id);
                    setUserData(userRes.data);
                    const purchasesRes = await fetchUserPurchases(user.id);
                    setUserPurchases(purchasesRes.data);
                }
            } catch (err) {
                setError(err.response?.data || "Something went wrong");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();}
        , [isLoggedIn, user]);
    if (loading) return <LoadingSpinner />;
    //if error, display error message and log out
    if (error) {
        return (
            <ErrorMessage message={error.message} onRetry={logout} />
        );
    }
    return (
        <div className="container">
            {isLoggedIn && (
                <>
                    <h3>Welcome {userData.firstName} {userData.lastName}!</h3>
                    <p> Email: {userData.email}</p>
                    <p> Phone Number: {userData.phone}</p>
                    <p> Sex: {userData.sex}</p>
                    <p>{userPurchases.length} Purchases</p>
                    <PurchaseList purchases={userPurchases}  />    
                </>
            )}
            {!isLoggedIn && (
                <p>Please log in to view your user profile</p>
            )}
        </div>
    )
}

export default UserInfo;