import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await login({email, password});
        } catch (err) {
            setError(err.response)
            console.error(err.response)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Input type="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit">Log In</Button>
            {error && <ErrorMessage message={error.data}/>}
        </form>
    )
}
export default LoginForm;