import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchUserPurchases } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import PurchaseList from '../purchases/PurchaseList.jsx';
import ErrorMessage from '../common/ErrorMessage';

const UserInfo = () => {
    const { user, isLoggedIn } = useAuth();
    // const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ userPurchases, setUserPurchases ] = useState([]);
    const [ error, setError ] = useState(null);

    useEffect( () =>{
        const fetchUser = async () => {
            try {
                if (isLoggedIn) {
                    // const usersRes = await fetchUsers(); // for admin only
                    // setUsers(usersRes.data); 
                    const purchasesRes = await fetchUserPurchases(user.id);
                    setUserPurchases(purchasesRes.data);
                }
            } catch (err) {
                setError(err);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();}
        , [isLoggedIn, user]);
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message}/>;
    return (
        <div className="container">
            {isLoggedIn && (
                <>
                    <h2>Welcome {user.firstName} {user.lastName}!</h2>
                    <p> Email: {user.email}</p>
                    <p> Phone Number: {user.phone}</p>
                    <p> Sex: {user.sex}</p>
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