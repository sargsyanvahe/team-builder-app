import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import InputText from "../Inputs/InputText";
import InputFile from "../Inputs/InputFile";
import InputRadio from "../Inputs/InputRadio";
import InputDate from "../Inputs/InputDate";
import Select from "../Inputs/Select";

import Button from "../Button/Button";
import './Auth.css'


function Register({ handleInputChange, fields, handleSubmit, processing, errors, companies }) {

    return (
        <form onSubmit={handleSubmit} className='auth-container'>
            <h1>Register</h1>
            <div>
                <InputText
                    error={!!errors.firstName}
                    value={fields.firstName || ''}
                    name='firstName'
                    placeholder='First Name'
                    onChange={handleInputChange}
                    errorText={errors.firstName || ''}
                    type='text'
                />
                <InputText
                    error={!!errors.lastName}
                    value={fields.lastName || ''}
                    name='lastName'
                    type='text'
                    onChange={handleInputChange}
                    errorText={errors.lastName || ''}
                    placeholder="Last Name"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
                <InputDate
                    type="date"
                    name='birthDate'
                    onChange={handleInputChange}
                    value={fields.birthDate}
                />
                <InputFile
                    error={!!errors.avatarUrl}
                    accept="image/*"
                    name='avatarUrl'
                    value={fields.avatarUrl}
                    onChange={handleInputChange}
                    id="photo-upload"
                />
            </div>
            <div>
                <InputText
                    error={!!errors.email}
                    value={fields.email || ''}
                    name='email'
                    type='email'
                    onChange={handleInputChange}
                    errorText={errors.email || ''}
                    placeholder="Email"/>
                <div>
                    <InputRadio text='Male' name='sex' value='male' checked={fields.sex === 'male'}
                                onChange={handleInputChange}/>
                    <InputRadio text='Female' name='sex' value='female' checked={fields.sex === 'female'}
                                onChange={handleInputChange}/>
                </div>
            </div>
            <div>
                <InputText
                    name='password'
                    error={!!errors.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    value={fields.password || ''}
                    type="password"
                    errorText={errors.password || ''}
                />
                <InputText
                    name='rePassword'
                    error={!!errors.rePassword}
                    onChange={handleInputChange}
                    placeholder="Repeat Password"
                    value={fields.rePassword || ''}
                    type="password"
                    errorText={errors.rePassword || ''}
                />
            </div>
            <div>
                <InputText
                    error={!!errors.jsExperience}
                    value={fields.jsExperience}
                    name='jsExperience'
                    type='number'
                    onChange={handleInputChange}
                    placeholder="JS Experience (months)"/>
                <InputText
                    error={!!errors.reactExperience}
                    value={fields.reactExperience}
                    name='reactExperience'
                    type='number'
                    onChange={handleInputChange}
                    placeholder="Experience in React (months)"/>
                <Select
                    name="companyId"
                    onChange={handleInputChange}
                    value={fields.companyId}
                    options={companies}
                    error={!!errors.companyId}
                />
            </div>
            <Button onClick={handleSubmit} color="#2980b9" disabled={processing}>
                Register
            </Button>
            <p>Already have an Account ? <Link to={'/login'}>Login</Link></p>
        </form>
    )
}

const mapStateToProps = ({ companies }) => {
    return {
        companies
    };
};


export default connect(mapStateToProps)(Register);