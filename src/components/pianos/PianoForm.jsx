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
        <form onSubmit={handleSubmit}>
            <Input label="Name" value={name} onChange={setName} />
            <Input label="Description" value={description} onChange={setDescription} />
            <Input label="Age" value={age} onChange={setAge} />
            <Input label="Brand" value={brand} onChange={setBrand} />
            <Input label="Type" value={type} onChange={setType} />
            <Input label="Price" value={price} onChange={setPrice} />
            { type === "keyboard" && <Input label="Number of Keys" value={numberOfKeys} onChange={setNumberOfKeys} /> }
            {error && <ErrorMessage message={error} />}
            {isLoggedIn && <Button type="submit">{pianoId ? "Update" : "Create"} Piano</Button>}
            {!isLoggedIn && <p>Please login to create or update a piano</p>}
        </form>
    )
}

export default PianoForm;