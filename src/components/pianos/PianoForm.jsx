import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import { createPiano, updatePiano } from '../../services/api';

const PianoForm = ({pianoId, initialData, onPianoCreated, onPianoUpdated}) => {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [age, setAge] = useState(initialData?.age || '');
    const [brand, setBrand] = useState(initialData?.brand || '');
    const [type, setType] = useState(initialData?.type || '');
    const [price, setPrice] = useState(initialData?.price || '');
    const [numberOfKeys, setNumberOfKeys] = useState(initialData?.numberOfKeys || '');
    const [error, setError] = useState(null);
    const { isLoggedIn } = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);
        const pianoData = {
            name, description, age:parseInt(age), 
            brand, type, price:parseFloat(price), 
            numberOfKeys:parseInt(numberOfKeys)};
        try {
            if (pianoId) {
                await updatePiano(pianoId, pianoData);
                if (onPianoUpdated) onPianoUpdated();
            } else {
                await createPiano(pianoData);
                if (onPianoCreated) onPianoCreated();
            }
        } catch (error) {
            setError(error.response.data);
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <div className="mb-3">
                <Input label="Name" value={name} onChange={setName} className="form-control" />
            </div>
            <div className="mb-3">
                <Input label="Description" value={description} onChange={setDescription} className="form-control" />
            </div>
            <div className="mb-3">
                <Input label="Age" value={age} onChange={setAge} className="form-control" />
            </div>
            <div className="mb-3">
                <Input label="Brand" value={brand} onChange={setBrand} className="form-control" />
            </div>
            <div className="mb-3">
                <Input label="Type" value={type} onChange={setType} className="form-control" />
            </div>
            <div className="mb-3">
                <Input label="Price" value={price} onChange={setPrice} className="form-control" />
            </div>
            {type === "keyboard" && (
                <div className="mb-3">
                    <Input label="Number of Keys" value={numberOfKeys} onChange={setNumberOfKeys} className="form-control" />
                </div>
            )}
            {error && (
                <div className="mb-3">
                    <ErrorMessage message={error} />
                </div>
            )}
            {isLoggedIn ? (
                <Button type="submit" className="btn btn-primary">
                    {pianoId ? "Update" : "Create"} Piano
                </Button>
            ) : (
                <p>
                    Please <a href="/login">login</a> to create or update a piano
                </p>
            )}
        </form>
    )
}

export default PianoForm;