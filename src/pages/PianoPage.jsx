import React, { useState } from "react";
import PianoList from "../components/pianos/PianoList";
import PianoForm from "../components/pianos/PianoForm";
import 'bootstrap/dist/css/bootstrap.min.css';

export const PianoPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const handlePianoCreated = () => {
        setIsFormOpen(false);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Pianos</h2>
            <button className="btn btn-primary mb-3" onClick={() => setIsFormOpen(true)}>Add Piano</button>
            {isFormOpen && (
                <div className="mb-4">
                    <PianoForm onPianoCreated={handlePianoCreated} />
                </div>
            )}
            <PianoList />
        </div>
    );
};