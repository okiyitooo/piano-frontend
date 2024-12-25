import React from 'react';
import { Link } from 'react-router-dom';

const PianoCard = ({ piano }) => {
    const displayName = piano.type === 'keyboard' ? `${piano.numberOfKeys} keys ${piano.name}` : piano.name;

    return (
        <div className="card piano-card">
            <div className="card-body">
                <Link to={`/pianos/${piano.id}`} className="card-title">
                    <h2>{displayName}</h2>
                </Link>
                <p className="card-text">Type: {piano.type}</p>
                <p className="card-text">Brand: {piano.brand}</p>
                <p className="card-text">Price: ${piano.price}</p>
            </div>
        </div>
    );
};

export default PianoCard;