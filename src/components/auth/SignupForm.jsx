import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';  // import the useAuth hook
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';

const SignupForm = () => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [sex, setSex] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { signup } = useAuth();  // get the signup function from the useAuth hook

    const handleSubit = async(e) =>{
        e.preventDefault();
        try {
            await signup({firstName, lastName, email, phone: phoneNum, sex, password}); 
        } catch (error) {
            setError(error.response);
            console.error(error.response);
        }
    }
    return (
        <form onSubmit={handleSubit}>
            {error && <ErrorMessage message={Object.keys(error.data).map(key=>{
                return error.data[key]
            })}/>}
            <Input type="text" label="First Name" onChange={e=>setFirstName(e.target.value)} required={true} />
            <Input type="text" label="Last Name" onChange={e=>setLastName(e.target.value)} required={true} />
            <Input type="email" label="Email" onChange={e=>setEmail(e.target.value)} required={true} />
            <Input type="tel" label="Phone Number" onChange={e=>setPhoneNum(e.target.value)} required={true} />
            <Input type="select" label="sex" onChange={e=>setSex(e.target.value)} required={true} options={["Male", "Female", "Prefer not to say"]}/>
            <Input type="password" label="Password" onChange={e=>setPassword(e.target.value)} required={true} />
            <Button type="submit">Sign Up</Button>
        </form>

    );
}

export default SignupForm;