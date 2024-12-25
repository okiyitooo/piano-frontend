import React, { useState, useEffect } from 'react';
import { fetchPianos } from '../../services/api';
import PianoCard from './PianoCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const PianoList = () => {
    const [pianos, setPianos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPianos = async () => {
            try {
                const pianos = await fetchPianos();
                setPianos(pianos.data);
            } catch (erro) {
                console.error(erro);
                setError(erro.response.data);
            } finally {
                setLoading(false);
            }
        };
        loadPianos();
    }, []);
    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="piano-list">
            {error && <ErrorMessage message = {error.message}/>}
            {pianos.map(piano=>(
                <PianoCard key={piano.id} piano={piano}/>
            ))}
        </div>
    )
}

export default PianoList;