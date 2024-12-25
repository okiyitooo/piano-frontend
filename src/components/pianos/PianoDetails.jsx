import React, { useState, useEffect} from 'react';
import {useParams } from 'react-router-dom';
import { fetchPianoById, createPurchase } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import ErrorMessage from '../common/ErrorMessage';
import Modal from '../common/Modal';

const PianoDetails = () => {
    const {id} = useParams();
    const [piano, setPiano] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, isLoggedIn } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const loadPiano = async() => {
            try {
                const piano = await fetchPianoById(id);
                setPiano(piano.data);
            } catch (error) {
                setError(error.response.data);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadPiano();
    }, [id]);
    const handlePurchase = async () => {
        try {
            if (user && piano) {
                const formattedDate = new Date().toISOString();
                await createPurchase({userId: user.id, pianoId: piano.id, date: formattedDate});
                setModalMessage('Purchase successful');
                setShowModal(true);
            } else {
                setModalMessage("couldn't purchase piano");
                setShowModal(true);
            }
            await createPurchase(id);
        } catch (error) {
            console.error(error);
            setShowModal(true);
            setModalMessage('Error purchasing piano!');
        }
    };
    if (loading) {
        return <LoadingSpinner />;
    }
    if (error) {
        return <ErrorMessage message={error} />;
    }
    return (
        <div className="container">
            <h2>{piano.name}</h2>
            <p>Description: {piano.description}</p>
            <p>Age: {piano.age}</p>
            <p>Brand: {piano.brand}</p>
            <p>Type: {piano.type}</p>
            <p>Price: ${piano.price}</p>
            {piano.type === 'keyboard' && <p>Number of keys: {piano.numberOfKeys}</p>}
            {isLoggedIn && <button onClick={handlePurchase} className="btn btn-primary">Purchase</button>}
            {!isLoggedIn && <button className="btn btn-primary" disabled title="Please Login to Purchase">Purchase</button>}
            <Modal show={showModal} handleClose={() => setShowModal(false)} title="Purchase">
                <p>{modalMessage}</p>
            </Modal>
        </div>
    )
}

export default PianoDetails;