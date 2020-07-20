import React from "react";
import { Link } from "react-router-dom";

import InputText from "../Inputs/InputText";
import Button from "../Button/Button";

import './Auth.css';

export default function Login({ handleInputChange, fields, handleSubmit, processing, errors }) {

    return (
        <form onSubmit={handleSubmit} className='auth-container'>
            <h1>Login</h1>
            <InputText
                error={!!errors.email}
                value={fields.email || ''}
                type='email'
                name='email'
                onChange={handleInputChange}
                errorText={errors.email || ''}
                placeholder="Email"/>
            <InputText
                name='password'
                error={!!errors.password}
                onChange={handleInputChange}
                placeholder="Password"
                value={fields.password || ''}
                type="password"
                errorText={errors.password || ''}
            />
            <div>
                <label style={{display: 'flex'}} className="checkbox">
                    <input checked={fields.remember} onChange={handleInputChange} name='remember' type="checkbox"/>
                    <svg viewBox="0 0 28 28">
                        <path
                            d="M3.5 8.49964C3.5 5.73822 5.73822 3.5 8.49964 3.5C10.3275 3.5 12.3499 3.5 14 3.5C15.6501 3.5 17.6725 3.5 19.5004 3.5C22.2618 3.5 24.5 5.73822 24.5 8.49964C24.5 10.3275 24.5 12.3499 24.5 14C24.5 15.6501 24.5 17.6725 24.5 19.5004C24.5 22.2618 22.2618 24.5 19.5004 24.5C17.6725 24.5 15.6501 24.5 14 24.5C12.3499 24.5 10.3275 24.5 8.49964 24.5C5.73822 24.5 3.5 22.2618 3.5 19.5004C3.5 17.6725 3.5 15.6501 3.5 14C3.5 12.3499 3.5 10.3275 3.5 8.49964Z"/>
                    </svg>
                    <svg className="tick" viewBox="0 0 12 10">
                        <path d="M1.5 5.5L4.5 8.5L10.5 1.5"/>
                    </svg>
                    <span style={{marginLeft:10}}>Remember me</span>
                </label>
            </div>
            <Button onClick={handleSubmit} color="#2ecc71" disabled={processing}>
                Login
            </Button>
            <p>Don't have an Account ? <Link to={'/register'}>Register</Link></p>
        </form>
    )
}