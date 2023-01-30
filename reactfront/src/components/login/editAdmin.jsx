import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/UseUser';

const URL = 'http://localhost:8000/products/admin'

const EditAdmin = () => {
    const user = useUser();
    const [hasUpdated, setHasUpdated] = useState(false);
    const [body, setbody] = useState({username: '', password: '', email: '', address: '', phone: 0});
    
    const inputChange = ({target}) => {
        const { name, value } = target;
        setbody({...body, [name]: value});  
    }

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(URL, body)
        .then(({data})=> {
            alert('Admin succesfully updated');
        })
        .catch(({response}) => {alert(response.message)});
        setHasUpdated(true);
    }

    if (hasUpdated){
        return <Navigate to={'/'}/>
    }
    
    if (!user.isAdmin) return <Navigate to={'/'}/>

    return (
        <>
            <div className="contenedor-general">
                <div className="contenedor-login">
                    <h1 className="titulo-login">Edit Admin</h1>
                    <form>
                        <div className="texto-form">Username:</div>
                        <input type="text" name="username" value={body.username} onChange={inputChange}/>
                        <div className="texto-form">Password:</div>
                        <input type="text" name="password" value={body.password} onChange={inputChange}/>
                        <div className="texto-form">email:</div>
                        <input type="text" name="email" value={body.email} onChange={inputChange}/>
                        <div className="texto-form">Address:</div>
                        <input type="text" name="address" value={body.address} onChange={inputChange}/>
                        <div className="texto-form">Phone:</div>
                        <input type="text" name="phone" value={body.phone} onChange={inputChange}/>
                        <button onClick={onSubmit}>CONTINUE</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditAdmin