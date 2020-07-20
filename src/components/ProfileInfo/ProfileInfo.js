import React from "react";

import InputText from "../Inputs/InputText";
import InputRadio from "../Inputs/InputRadio";
import InputDate from "../Inputs/InputDate";
import Select from "../Inputs/Select";
import Button from "../Button/Button";

import './ProfileInfo.css'


function ProfileInfo({ handleInputChange, fields, handleSubmit, handleEdit, errors, companies, isEditable }) {

    return (
        <>
            <div onSubmit={handleSubmit} className='profile-info-container'>
                <div>
                    <InputText
                        error={!!errors.firstName}
                        disabled={!isEditable}
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
                        disabled={!isEditable}
                        name='lastName'
                        type='text'
                        onChange={handleInputChange}
                        errorText={errors.lastName || ''}
                        placeholder="Last Name"/>
                </div>
                <div>
                    <InputDate
                        type="date"
                        disabled={!isEditable}
                        name='birthDate'
                        onChange={handleInputChange}
                        value={fields.birthDate}
                    />
                </div>
                <div>
                    <InputText
                        disabled={!isEditable}
                        error={!!errors.email}
                        value={fields.email || ''}
                        name='email'
                        type='email'
                        onChange={handleInputChange}
                        errorText={errors.email || ''}
                        placeholder="Email"/>
                    <div>
                        <InputRadio disabled={!isEditable} text='Male' name='sex' value='male'
                                    checked={fields.sex === 'male'}
                                    onChange={handleInputChange}/>
                        <InputRadio disabled={!isEditable} text='Female' name='sex' value='female'
                                    checked={fields.sex === 'female'}
                                    onChange={handleInputChange}/>
                    </div>
                </div>
                <div>
                    <InputText
                        error={!!errors.jsExperience}
                        value={fields.jsExperience}
                        name='jsExperience'
                        disabled={!isEditable}
                        type='number'
                        onChange={handleInputChange}
                        placeholder="JS Experience (months)"/>
                    <InputText
                        error={!!errors.reactExperience}
                        value={fields.reactExperience}
                        name='reactExperience'
                        type='number'
                        disabled={!isEditable}
                        onChange={handleInputChange}
                        placeholder="Experience in React (months)"/>
                    <Select
                        disabled={!isEditable}
                        name="companyId"
                        onChange={handleInputChange}
                        value={fields.companyId}
                        options={companies}
                        error={!!errors.companyId}
                    />
                </div>
                {isEditable ?
                    <Button onClick={handleSubmit} color="#130f40">
                        Save
                    </Button> :
                    <Button onClick={handleEdit} color="#6ab04c">
                        Edit
                    </Button>}
            </div>
        </>
    )
}


export default ProfileInfo;